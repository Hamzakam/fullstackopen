import React from "react";
import ReactDOM from "react-dom";

const Header = ({ text }) => {
    return <h2>{text}</h2>;
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
    const courses = [
        {
            name: "Half Stack application development",
            id: 1,
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
        },
        {
            name: "Node.js",
            id: 2,
            parts: [
                {
                    name: "Routing",
                    exercises: 3,
                    id: 1,
                },
                {
                    name: "Middlewares",
                    exercises: 7,
                    id: 2,
                },
            ],
        },
    ];

    return (
        <div>
            <h1>Web Development Curriculum</h1>
            {courses.map((course) => (
                <Course course={course} key={course.id} />
            ))}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
