import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import { validateToken } from '../../app/api';
import { Block } from '../../components/Component';
import Head from '../../layout/head/Head';
import PageContainer from '../../layout/page-container/PageContainer';

const AutoLog = () => {
    let {token} = useParams();

    const tokenDecode = async (val) => {
        let str = window.atob(val);
        let vals = str.split('|');

        let utoken = vals[0]; 
        
        if(utoken.length > 0) {
            let res = await validateToken(vals[1], utoken);
            
            if(res.status == 1) {
                
                localStorage.setItem("accessToken", utoken);
                localStorage.setItem("uid", res.uid);
                localStorage.setItem("fname", res.fname);
                localStorage.setItem("lname", res.lname);
                localStorage.setItem("email", res.email);
                localStorage.setItem("wlt", res.wallet);
                setTimeout(() => {
                  window.history.pushState(
                    `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
                    "auth-login",
                    `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`
                  );
                  window.location.reload();
                }, 1000);
            } 
        }

    }


    useEffect(()=>{
        tokenDecode(token);

    },[]);

    return (  
        <React.Fragment>
        <Head title="Auto Login" />
        <PageContainer>
            <Block className="nk-block-middle nk-auth-body  wide-xs">

            <h4 className='text-center text-primary'>Please wait...</h4>
            </Block>
        </PageContainer>
        </React.Fragment>
    )
      
    
}

export default AutoLog;