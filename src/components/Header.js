import React from "react"
import { Card, CardBody } from "reactstrap";

function Header({name, title}){
    return(
        <>
        <div>
            <Card className="my-2 bg-warning" style={{ backgroundColor: '#32CD32' }}>
                <CardBody>
                    <h2 className="text-center my-2">Welcome to Exam portal</h2>
                </CardBody>
            </Card>
        </div>    
        </>
    );
}

export default Header;