import React from "react";
import ReactDOM from "react-dom";
const Header = ({ text }) => {
    return <h1>{text}</h1>;
};
const Part = ({ part, exercises, id }) => {
    return (
        <p key={id}>
            {part} {exercises}
        </p>
    );
};
const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part) => {
                return (
                    <Part
                        part={part.name}
                        exercises={part.exercises}
                        key={part.id}
                    />
                );
            })}
        </div>
    );
};
//No changes.
const Total = ({ parts }) => {
    return (
        <b>
            Total of{" "}
            {parts.reduce((sum, part) => {
                return sum + part.exercises;
            }, 0)}{" "}
            exercises.
        </b>
    );
};
const Course = ({ course }) => {
    return (
        <div>
            <Header text={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};
const App = () => {
    const course = {
        id: 1,
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
                id: 1,
            },
            {
                name: "Using props to pass data",
                exercises: 7,
                id: 2,
            },
            {
                name: "State of a component",
                exercises: 14,
                id: 3,
            },
            {
                name: "Redux",
                exercises: 11,
                id: 4,
            },
        ],
    };

    return <Course course={course} />;
};

ReactDOM.render(<App />, document.getElementById("root"));
