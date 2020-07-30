import HttpsRedirect from 'react-https-redirect';

class HttpsApp extends React.Component {
    render() {
        return (
            <HttpsRedirect>
                <App />
            </HttpsRedirect>
        )
    }
}


export default HttpsApp;