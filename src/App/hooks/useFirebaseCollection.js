import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  asyncActionERROR,
  asyncActionFINISH,
  asyncActionStart,
} from "../async/asyncReducer";
import { dataFromSnapShot } from "../firestore/firestoreService";

export default function useFirestoreCollection({ query, data, deps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncActionStart());
    const unsubscribe = query().onSnapshot(
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => dataFromSnapShot(doc));
        data(docs);
        dispatch(asyncActionFINISH());
      },
      (error) => dispatch(asyncActionERROR(error))
    );
    return () => {
      unsubscribe();
    };
  }, deps); // eslint-disable-line
}
