const students = [
    {
        id: 1,
        name: 'jm',
    },
    {
        id: 2,
        name: 'steve',
    },
    {
        id: 3,
        name: "bill",
    }
]

function AttandanceBook(props) {
    return (
        <ul>
            {/* {students.map((student) => {
                return <li key={student.id}>{student.name}</li>
            })} */}
            {students.map((student, index) => {
                return <li key={index}>{student.name}</li>
            })}
        </ul>
    )
}

export default AttandanceBook;