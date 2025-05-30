import { useLocation, useNavigate } from 'react-router-dom'
import { FaCircleArrowLeft } from 'react-icons/fa6'

const BackButton = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate(-1)
    } else {
      navigate('/') // переход на главную, если "назад" невозможен
    }
  }

  if (location.pathname === '/') {
    return null
  }

  return (
    <button onClick={handleGoBack}>
      <FaCircleArrowLeft color='#6f1687' />
    </button>
  )
}

export default BackButton
