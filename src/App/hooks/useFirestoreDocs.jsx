import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  asyncActionERROR,
  asyncActionFINISH,
  asyncActionStart,
} from "../async/asyncReducer";
import { dataFromSnapShot } from "../firestore/firestoreService";
import { toastr } from "react-redux-toastr";

export default function useFirestoreDocs({ query, data, deps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncActionStart());
    const unsubscribe = query().onSnapshot(
      (snapshot) => {
        console.log("snapshot=---->", snapshot.data());
        if (!snapshot.exists) {
          dispatch(
            asyncActionERROR({
              code: "not Found",
              message: "Could not Find Docu",
            })
          );
          toastr.error("There is no such event with this ID");
          dispatch(asyncActionFINISH());
          return;
        }
        data(dataFromSnapShot(snapshot));
      },
      (error) => dispatch(asyncActionERROR())
    );
    return unsubscribe;
  }, deps); // eslint-disable-line
}
