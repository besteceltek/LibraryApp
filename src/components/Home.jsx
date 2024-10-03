import home from '../../public/home.png'

function Home() {
  return (
    <div>
        <h1 style={{ color: 'var(--text-color)'}}>WELCOME TO BEST READS</h1>
        <img src={home} alt="" style={{width:'1200px', overflowY:'hidden'}} />
    </div>
  )
}

export default Home