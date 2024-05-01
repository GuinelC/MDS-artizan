import PropTypes from 'prop-types'

function Input ({ label, name, value, onChange, placeholder, error, type = 'text' }) {
  return (
    <>
      <label>
        {label}
        <input name={name} value={value} onChange={onChange} placeholder={placeholder} type={type} />
      </label>
      {
                error && <p style={{ color: 'red' }}>{error}</p>
            }
    </>
  )
}

Input.propType = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string
}

export default Input
