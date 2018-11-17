class Queue {
    constructor () {
      this.items = []
    }

    enqueue (item) {
      this.items.push(item)
    }

    dequeue () {
      if (!this.isEmpty()) {
        return this.items.shift()
      }
    }

    front () {
      if (!this.isEmpty()) {
        return this.items[0]
      }
    }

    isEmpty () {
      return !this.items.length
    }
  }

  class Customer {
    constructor (firstName, lastName) {
      this.firstName = firstName
      this.lastName = lastName
    }

    recieveLetter (letter) {
      const { from: { firstName }, content } = letter
      console.log(`${firstName} says: '${content}''`)
    }
  }

  const CHANCE_OF_LOST_LETTER = 0.1

  class PostOffice {
    constructor () {
      this.letters = new Queue()

      setInterval (async () => {
        try {
          await this.sendALetter()
        } catch (error) {
          console.error(error)
        }
      }, 10000)
    }

    sendALetter () {
      let letter = this.letters.dequeue()

      return new Promise((resolve, reject) => {
        if (!letter) {
          reject('No letter to send!')
        } else if (JSON.stringify(letter.to) === JSON.stringify(letter.from)) { // We're comparing objects like this for the sake of simplicity
          reject('You cannot send a letter to yourself, it\'s sad!')
        } else if (Math.random() > CHANCE_OF_LOST_LETTER) {
          setTimeout(() => {
            resolve(letter.to.recieveLetter(letter))
          }, 3000)
        } else {
          reject('The letter was lost!')
        }
      })
    }

    scheduleForSending (letter) {
      this.letters.enqueue(letter)
    }
  }

  class Letter {
    constructor (from, to, content) {
      this.from = from
      this.to = to
      this.content = content
    }
  }

  let jane = new Customer('Jane', 'Doe')
  let john = new Customer('John', 'Doe')

  let postOffice = new PostOffice()

  postOffice.scheduleForSending(new Letter(jane, john, 'This is a message'))
  postOffice.scheduleForSending(new Letter(john, jane, 'This is a message'))
  postOffice.scheduleForSending(new Letter(john, jane, 'This is a message'))
  postOffice.scheduleForSending(new Letter(john, john, 'This is a message'))
  postOffice.scheduleForSending(new Letter(jane, john, 'This is a message'))
  postOffice.scheduleForSending(new Letter(jane, jane, 'This is a message'))
  postOffice.scheduleForSending(new Letter(jane, john, 'This is a message'))
  postOffice.scheduleForSending(new Letter(jane, john, 'This is a message'))




