import React, { useState, useMemo}  from 'react'
import api from '../../services/api'
import './styles.css'
import camera from '../../assets/camera.svg'
 
export default function New( {history} ){
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    },[thumbnail])

    async function handleSubmit(event){
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);


        await api.post('./spots', data, {
            headers: { user_id }
        })

        history.push('/dashboard');
    }

    // handleSubmit().then(function enviar(){
    //     return history.push('./dashboard');
    // })

    return (
        <form onSubmit={handleSubmit}>
            <label id="thumbnail" 
            style={{ backgroundImage: `url(${preview})` }}
            className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select img"/>

            </label>
            <label htmlFor="company">Empresa</label>
            <input 
                id="company"
                placeholder="Sua Empresa"
                value={company}
                onChange ={event => setCompany(event.target.value)}
            />
             <label htmlFor="techs">Tecnologias <span>separadas por vírgula</span></label>
            <input 
                id="techs"
                placeholder="Tecnologias da sua empresa"
                value={techs}
                onChange ={event => setTechs(event.target.value)}
            />
            <label htmlFor="price">Valor da Diária <span>(embranco para Gratuito)</span></label>
            <input 
                id="price"
                placeholder="Valor Cobrado por Dia"
                value={price}
                onChange ={event => setPrice(event.target.value)}
            />
            <button className="btn" type="submit">Cadastrar</button>
        </form>
        )
}