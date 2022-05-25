import React from "react";

/** React's recommended pattern for deriving state from props
 *  because setting state inside useEffect can become expensive
 *  Example taken from
 *  https://betterprogramming.pub/updating-state-from-properties-with-react-hooks-5d48693a4af8
 */
type InternalState<S> = S;
type SetInternalState<S> = (value: React.SetStateAction<S>) => void;

function useStateFromProps<S>(
  externalState: S,
): [InternalState<S>, SetInternalState<S>] {
  const [internalState, setInternalState] = React.useState(externalState);

  const previousValueRef = React.useRef<S>();
  const previousValue = previousValueRef.current;
  if (externalState !== previousValue && externalState !== internalState) {
    setInternalState(externalState);
  }

  React.useEffect(() => {
    previousValueRef.current = externalState;
  });

  return [internalState, setInternalState];
}

export default useStateFromProps;
