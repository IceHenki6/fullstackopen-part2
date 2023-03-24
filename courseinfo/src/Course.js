const Header = ({ name }) => {
    return (
        <>
            <h1>{name}</h1>
        </>
    )
}

const Part = (props) => {
    return (
        <>
            <p>
                {props.partName} {props.exercises}
            </p>
        </>
    )
}

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part => <Part partName={part.name} key={part.id} exercises={part.exercises} />)}
        </>
    )
}

const Total = ({ parts }) => {
    const sum = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
    return (
        <>
            <p>Number of exercises {sum}</p>
        </>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}


export default Course