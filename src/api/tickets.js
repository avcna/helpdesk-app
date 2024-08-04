import { firestore } from "./config";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  serverTimestamp,
  doc,
  updateDoc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  and,
  Timestamp,
} from "firebase/firestore";

const ticketRef = collection(firestore, "tickets");

export const postTicket = async (data) => {
  const ref = await addDoc(ticketRef, {
    ...data,
    timestamp: serverTimestamp(),
    status: "open",
    priority: 2,
    reject: false,
    progress: "Waiting on feature request",
    response: "No response yet",
  });
  return ref.id;
};

export const getTicketByStatusCount = async (status) => {
  const filter = query(ticketRef, where("status", "==", status));
  const q = await getDocs(filter);
  const count = q.size;
  return count;
};

export const getAllTicketCount = async () => {
  try {
    const q = await getDocs(ticketRef);
    const count = q.size;
    return count;
  } catch (error) {
    console.error("Error getting documents: ", error);
    return 0;
  }
};

export const getAllTickets = (setAllTickets) => {
  const q = query(ticketRef, orderBy("timestamp", "desc"));
  onSnapshot(q, (response) => {
    setAllTickets(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getSortedTickets = (setSortedTickets, val) => {
  const q = query(ticketRef, orderBy("priority", val));
  onSnapshot(q, (response) => {
    setSortedTickets(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getTicketsByStatus = (setTickets, status) => {
  if (status === "unresolved") {
    // Query for open tickets
    const qOpen = query(ticketRef, where("status", "==", "open"));
    // Query for onHold tickets
    const qOnHold = query(ticketRef, where("status", "==", "onHold"));
    // Query for overdue tickets
    const qOverdue = query(ticketRef, where("status", "==", "overdue"));

    const tickets = [];

    onSnapshot(qOpen, (response) => {
      response.docs.forEach((doc) => {
        tickets.push({ ...doc.data(), id: doc.id });
      });
      setTickets([...tickets]);
    });

    onSnapshot(qOnHold, (response) => {
      response.docs.forEach((doc) => {
        tickets.push({ ...doc.data(), id: doc.id });
      });
      setTickets([...tickets]);
    });

    onSnapshot(qOverdue, (response) => {
      response.docs.forEach((doc) => {
        tickets.push({ ...doc.data(), id: doc.id });
      });
      setTickets([...tickets]);
    });
  } else {
    const q = query(ticketRef, where("status", "==", status));
    onSnapshot(q, (response) => {
      setTickets(
        response.docs.map((docs) => {
          return { ...docs.data(), id: docs.id };
        })
      );
    });
  }
};

export const getTicketById = async (ticketId) => {
  try {
    const ticketDocRef = doc(ticketRef, ticketId);
    const ticketDoc = await getDoc(ticketDocRef);

    if (ticketDoc.exists()) {
      return { id: ticketDoc.id, ...ticketDoc.data() };
    } else {
      throw new Error("No such document!");
    }
  } catch (error) {
    console.error("Error getting ticket by ID: ", error);
    throw error;
  }
};

export const editTicket = (id, data) => {
  let docToEdit = doc(ticketRef, id);
  let status = { status: data.status };
  if (data.reject) {
    status.status = "rejected";
  }
  try {
    updateDoc(docToEdit, {
      ...status,
      response: data.response,
      priority: parseInt(data.priority),
      progress: data.progress.toString(),
      reject: data.reject,
    }).then(() => {
      return "Data updated successfully";
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTicketsCountForMonth = async (month) => {
  if (month < 1 || month > 12) {
    throw new Error("Month must be between 1 and 12.");
  }

  // Mendapatkan timestamp awal dan akhir untuk bulan yang diberikan
  const startOfMonth = new Timestamp(
    new Date(new Date().getFullYear(), month - 1, 1).getTime() / 1000,
    0
  );
  const endOfMonth = new Timestamp(
    new Date(new Date().getFullYear(), month, 1).getTime() / 1000,
    0
  );

  const filter = query(
    ticketRef,
    where("timestamp", ">=", startOfMonth),
    where("timestamp", "<", endOfMonth)
  );

  try {
    const querySnapshot = await getDocs(filter);
    const count = querySnapshot.size;
    return count;
  } catch (error) {
    console.error(`Error getting tickets count for month ${month}: `, error);
    throw error;
  }
};

export const getTicketByProgressCount = async (progress) => {
  const filter = query(ticketRef, where("progress", "==", progress));
  const querySnapshot = await getDocs(filter);

  // Menyaring tiket yang tidak memiliki status 'rejected' atau 'closed'
  const filteredDocs = querySnapshot.docs.filter((doc) => {
    const status = doc.data().status;
    return status !== "rejected" && status !== "closed";
  });

  const count = filteredDocs.length;
  return count;
};
