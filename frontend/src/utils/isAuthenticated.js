export const isAuthenticated = async ()=>{
    const res = await fetch('http://localhost:3000/auth/auth-check',{
        credentials : 'include'
    });
    return res.ok;
}