
const ErrorMessage = ({message}) => {
    if(message===null){
        return null
    }

    return(
        <div className="error-msg">
            {message}
        </div>
    )
}

export default ErrorMessage