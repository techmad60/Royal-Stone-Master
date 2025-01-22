export default function Circle() {
    return(
        <div style={{
            height: '25px',
            width: '25px',
            border: '1px solid #2C3E50', // Black border
            borderRadius: '50%', // Makes the div a circle
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#D9D9D9' // Optional: white background color
        }}>
        </div>
    )
}