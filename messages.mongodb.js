use('messages')

// db.messages.insertMany([
//   { message: 'Паровоз, паровоз там' },
//   { message: 'Хто?' },
//   { message: 'Бачу паровоз та інший паровоз' },
//   { message: '' },
//   { message: 'бла, бла, бла' }
// ])

db.messages.aggregate([
  { $unwind: '$message' },
  {
    $match: {
      message: { $regex: 'паровоз', $options: 'i' }
    }
  },
  { $group: { _id: '$message', count: { $sum: +1 } } },
  { $project: { count: '$count' } }
])

// db.messages.aggregate([
//   { $unwind: '$message' },
//   {
//     $match: {
//       message: { $regex: 'паровоз', $options: 'i' }
//     }
//   },
//   {$count: "count_words"}
// ])

// db.messages.drop()
