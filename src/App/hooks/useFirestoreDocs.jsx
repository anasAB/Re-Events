import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  asyncActionERROR,
  asyncActionFINISH,
  asyncActionStart,
} from "../async/asyncReducer";
import { dataFromSnapShot } from "../firestore/firestoreService";

export default function useFirestoreDocs({
  query,
  data,
  deps,
  shouldExecute = true,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shouldExecute) return;
    dispatch(asyncActionStart());
    const unsubscribe = query().onSnapshot(
      (snapshot) => {
        if (!snapshot.exists) {
          dispatch(
            asyncActionERROR({
              code: "not-found",
              message: "Could not find document",
            })
          );
          return;
        }
        data(dataFromSnapShot(snapshot));
        dispatch(asyncActionFINISH());
      },
      (error) => dispatch(asyncActionERROR())
    );
    return () => {
      unsubscribe();
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
