
export function Course({ course }) {

    const Header = (props) => <h1>{props.course}</h1>

    const Content = (props) => (
        <div>
          
            {props.parts.map((part) => (
                <Part key={part.id} part={part} />
            ))}
        </div>
    )

    const Part = (props) => (
        <p>   
            {props.part?.name} {props.part?.exercises}
        </p>
    )

    const Total = (props) => <p>Number of exercises {props.total}</p>

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total
                total={
                    course.parts.reduce((accumulator, part) => accumulator + part.exercises, 0)
                }
            />
        </div>
    )
}