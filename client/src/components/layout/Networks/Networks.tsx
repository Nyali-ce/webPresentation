import './Networks.scss'

function NavBar() {
  return (
    <>
      <div className='networks'>
        <div className="networksLink networksYoutube">
            <a href="https://www.youtube.com/channel/UC4YnHM9bG8mCPBGOnrg9-XA" target='blank_'>YouTube</a>
        </div>
        <div className="networksLink networksTwitter">
            <a href="https://twitter.com/Nyali_ce" target='blank_'>Twitter</a>
        </div>
        <div className='networksLink networksEmail'>
            <a href="mailto:nyali@nyalice.com">nyali@nyalice.com</a>
        </div>
      </div>
    </>
  )
}

export default NavBar
