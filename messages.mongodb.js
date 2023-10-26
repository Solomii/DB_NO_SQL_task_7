use('messages')

// db.messages.insertMany([
//   { message: 'Паровоз, паровоз там' },
//   { message: 'Хто?' },
//   { message: 'Бачу паровоз та інший паровоз' },
//   { message: '' },
//   { message: 'бла, бла, бла' }
// ])

db.messages.aggregate([
  { $project: { words: { $split: ['$message', ' '] } } },
  { $unwind: '$words' },
  {
    $match: {
      words: { $regex: /паровоз/, $options: 'i' }
    }
  },
  { $group: { _id: '$words', countWords: { $push: '$words' } } },
  {
    $project: {
      wordCount: { $size: '$countWords' }
    }
  }
])

// db.messages.drop()
