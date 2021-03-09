import React from "react";

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
export default Course;
