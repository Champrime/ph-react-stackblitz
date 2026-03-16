function ToDo ({ task, isDone }) {
    
    if (isDone){
        return (
        <>
            <li>React core concepts</li>
                <li>Task: {task}</li>
        </>
        )
    }
}

export default ToDo;