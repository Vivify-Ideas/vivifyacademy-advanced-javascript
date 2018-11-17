
// This function will get a random property from an object,
// it exists only to better simulate the error response, instead of hard-coding properties
function getRandomObjectProperty (obj) {
  let keys = Object.keys(obj)
  return keys[ keys.length * Math.random() << 0]
}

class Errors {
  constructor() {
    this.errors = {}
  }

  has (field) {
    return this.errors.hasOwnProperty(field)
  }

  any () {
    return Object.keys(this.errors).length
  }

  get (field) {
    if (this.errors[field]) {
      return this.errors[field][0]
    }
  }

  record (errors) {
    this.errors = errors
  }

  clear (field) {
    if (field) {
      delete this.errors[field]

      return
    }

    this.errors = {}
  }
}

class Form {
  constructor(data) {
    this.originalData = data

    for (let field in data) {
      this[field] = data[field]
    }

    this.errors = new Errors()
  }

  data() {
    let data = {}

    for (let property in this.originalData) {
      data[property] = this[property]
    }

    return data
  }

  reset() {
    for (let field in this.originalData) {
        this[field] = ''
    }

    this.errors.clear()
  }

  submit(requestType, url) {
    console.log(`Trying to submit a ${requestType} request to ${url}`)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() >= 0.5) {
          let response = {
            data: {
              message: 'Successfully submitted'
            }
          }

          this.onSuccess(response.data)

          resolve(response.data)
        } else {
          let error = {
            response: {
              data: {
                [getRandomObjectProperty(this.originalData)] : 'This field is required'
              }
            }
          }

          this.onFail(error.response.data)

          reject(error.response.data)
        }
      }, 1000)
    })
  }

  onSuccess(data) {
    console.log('Success:', data.message)

    this.reset()
  }

  onFail(errors) {
    console.log('Some errors happened', errors)
    this.errors.record(errors)
  }
}

const registrationForm = new Form({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
})

registrationForm.submit('POST', 'http://localhost:8000')
