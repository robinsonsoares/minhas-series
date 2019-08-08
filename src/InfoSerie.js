import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const InfoSerie = ({ match }) => {
    const [name,setName] = useState('')
    const [success, setSuccess] = useState(false)

    const [data,setData] = useState({})
    useEffect(() => {
        axios
            .get('/api/series/'+ match.params.id)
            .then(res => {
                setData(res.data)
            })
    }, [match.params.id])

    // custom header
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    const onChange = evt => {
        setName(evt.target.value)
    }
    const save = () => {
        axios
            .post('/api/series', {
                name
            })
            .then(res => {
                setSuccess(true)
            })
    }
    if (success) {
        return <Redirect to='/series' />
    }
    return (
        <div>
            <header style={masterHeader}>
                <div className='h-100' style={{ background:'rgba(0,0,0,0.7)'}}>
                <div className='h-100 container'>
                    <div className='row'>
                            <div className='col-3'>
                                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster} />
                            </div>
                            <div className='col-8'>
                                título
                            </div>                        
                        </div>
                    </div>
                </div>    
            </header>
            <div className='container'>
                <h1>Séries</h1>
                <pre>{JSON.stringify(data)}</pre>
                <form>
                <div className='form-group'>
                    <label htmlFor='name'>Nome</label>
                    <input type='text' value={name} onChange={onChange} className='form-control' id='name' placeholder='Nome da Série' />
                </div>
                <button type='button' onClick={save} className="btn btn-primary">Salvar</button>
                </form>
            </div>
        </div>        
    )
}
export default InfoSerie
