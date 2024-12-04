import React from "react";

const ProgressBar = ({ progress }) => {
    return (
        <div style={{ border: "1px solid #ddd", borderRadius: "4px", height: "20px", width: "100%", marginTop: "10px" }}>
            <div
                style={{
                    height: "100%",
                    width: `${progress}%`,
                    backgroundColor: progress === 100 ? "green" : "blue",
                    borderRadius: "4px",
                }}
            ></div>
        </div>
    );
};

export default ProgressBar;
