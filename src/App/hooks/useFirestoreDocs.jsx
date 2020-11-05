import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  asyncActionERROR,
  asyncActionFINISH,
  asyncActionStart,
} from "../async/asyncReducer";
import { dataFromSnapShot } from "../firestore/firestoreService";

export default function useFirestoreDocs({ query, data, deps, shouldExecute }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shouldExecute) return;

    dispatch(asyncActionStart());
    const unsubscribe = query().onSnapshot(
      (snapshot) => {
        if (!snapshot.exists) {
          dispatch(
            asyncActionERROR({
              code: "not Found",
              message: "Could not Find Docu",
            })
          );

          return;
        }
        data(dataFromSnapShot(snapshot));
        dispatch(asyncActionFINISH());
      },
      (error) =>
        dispatch(
          asyncActionERROR({
            code: "userFireStoreDocs",
            message: "Check userFireStoreDocs Component",
          })
        )
    );
    return unsubscribe;
  }, deps); // eslint-disable-line
}
