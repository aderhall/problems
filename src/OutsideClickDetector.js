import React, { useRef, useEffect } from "react";

function OutsideClickDetector(props) {
    // Create a reference to this wrapper element
    const selfRef = useRef(null);
    // Destructure the callback from the props object so that we can tell useEffect to update whin it is changed
    const { onClickOutside, active, ...filteredProps } = props;
    useEffect(() => {
        if (active) {
            const handler = (event) => {
                // If the ref has been set and the click happens outside of this component
                if (selfRef.current !== null && !selfRef.current.contains(event.target)) {
                    // Call the props.onClickOutside callback
                    onClickOutside();
                }
            }
            document.addEventListener("mousedown", handler);
            document.addEventListener("focusin", handler); // Focus doesn't bubble, so it must be captured
            return () => {
                // Cleanup
                document.removeEventListener("mousedown", handler);
                document.removeEventListener("focusin", handler);
            };
        }
    }, [selfRef, onClickOutside, active]); // Update the effect when we are given a new reference or callback
    
    return (
        <div ref={selfRef} {...filteredProps}>
            {props.children}
        </div>
    );
}
OutsideClickDetector.defaultProps = {
    className: "",
    onClickOutside: () => console.warn("No onClickOutside passed to OutsideClickDetector"),
    active: true
}

export default OutsideClickDetector;