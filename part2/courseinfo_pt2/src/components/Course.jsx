const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Header = ({ name }) => <h1>{name}</h1>;

const Course = ({ course }) => {
  const total = course.parts.reduce((akku, num) => akku + num.exercises, 0);
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <p>total of {total} exercises</p>
    </>
  );
};

export default Course;
