import React, { useEffect, useState } from "react";

//importing material UI
import Button from '@mui/material/Button';
import { Box } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress  from '@mui/material/CircularProgress';

//importing components
import HeaderComponent from "./header";


function FileInput() {

    const [data2, setData2] = useState([])
    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [loading,setLoading]=useState(false)
    

    const onFetchdata = async () => {
        setLoading(true)
        try {

            var myHeaders = new Headers();
            myHeaders.append("Authorization", sessionStorage.getItem('access_token'));
            var formdata = new FormData();
            formdata.append("documents_scanning", image, image.name);
            var requestOptions = { method: 'POST', headers: myHeaders, body: formdata, redirect: 'follow' };

            await fetch("https://dev-api.labsquire.com/v1.0/documents-scanning", requestOptions)
                .then(response => response.json())
                .then(result => {
                    valueToArray(result);
                    setLoading(false)
                })
                .catch(error => console.log('error ', error));
                
        }
        catch (err) {
            console.error(err)
        }

    }

    const valueToArray = (responseData) => {
        if (responseData) {

            if (responseData.data) {

                if (responseData.data.IdentityDocuments) {
                    let onePageData = responseData.data.IdentityDocuments[0].IdentityDocumentFields
                    setData2(onePageData)
                }
            }
        }
    }

    const handleRemove = () => {
        setImage(null)
        setImageUrl(null)
        setData2('')
    }
    useEffect(() => {
        if (image) {
            setImageUrl(URL.createObjectURL(image));
        }
    }, [image])

    return (
        <>
            <HeaderComponent />

            <div className="preview">
           
            {!image && !imageUrl && (
               <input type="file" id="select-image" onChange={(e => setImage(e.target.files[0]))} />   
            )}
            
                {imageUrl && image && (
                    <Box mt={2} textAlign="center">
                        <div> Image Preview: </div>
                        <img src={imageUrl} alt={image.name} height="250px" />
                    </Box>
                )}  
                {imageUrl && image && (
                    <Box mt={0} textAlign="right">
                        <DeleteIcon onClick={handleRemove}/>
                    </Box>
                )}
            </div>
            
            <div className="inputdata">
                
                <div className="button">
                    {image && (<Button variant="contained" color="primary" component="span" onClick={onFetchdata}>SUBMIT</Button>)}
                    {!image && (<Button disabled>SUBMIT</Button>)}
                </div>
            </div>
            {loading === true && (
           <Box sx={{ display: 'flex', flexDirection: 'row', marginLeft: 85,marginTop:9, zIndex: -5, backgroundColor: "white", opacity: 0.6 }}>
                <CircularProgress />
             </Box>)}
         
            {data2[0] && <table className='table_styles' id="customers">
                <tr>
                    <th>Key</th><th>Value</th>
                </tr>

                {data2.map((d, index) => {
                    return (
                        <tr key={index} >
                            <td>{d.Type.Text}</td><td>{d.ValueDetection.Text}</td>
                        </tr>
                    )
                })}
            </table>}






        </>
    )
};

export default FileInput;

