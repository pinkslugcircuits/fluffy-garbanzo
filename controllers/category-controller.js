import path from 'path'
const port = process.env.PORT
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0
const url = 'https://0.0.0.0:' + port + '/api/v1/categories'
const url2 = 'https://0.0.0.0:' + port + '/api/v1/products'

const category = async (req, res, next) => {
  const cats = await getCatData()
  res.locals.title = 'Categories'
  res.status(200)
  res.render('pages/categories', { cats, user: req.user })
}

const newCategory = async (req, res, next) => {
  res.locals.title = 'newCategory'
  res.status(200)
  res.render('pages/newCategory', { user: req.user })
}

const processNewCategory = async (req, res, next) => {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.')
  }
  const file = req.files.catImage
  const extensionName = path.extname(file.name)
  const allowedExtension = ['.png', '.jpg', '.jpeg']
  if (!allowedExtension.includes(extensionName)) {
    return res.status(422).send('Invalid Image')
  }
  const imagePath = './files/category/images/' + file.name
  file.mv(imagePath, (err) => {
    if (err) {
      return res.status(500).send(err)
    }
    const categoryName = req.body.catName
    const result = createCat(categoryName, imagePath)
    res.redirect('/categories', { id:result.id }, { user: req.user })
  })
}

const editCategory = async (req, res, next) => {
  const catId = req.params.id
  const cats = await getCatDataId(catId)
  res.locals.title = 'editCategory'
  res.locals.id = req.params.id
  res.status(200)
  res.render('pages/editCategory', { cats, user: req.user })
}

const processEditCategory = async (req, res, next) => {
  const catId = req.params.id
  var updateCat = await getCatDataId(catId)
  if (!req.files) {
  } else if (req.files.catImage) {
    console.log("Image file found")
    var file = req.files.catImage
    var extensionName = path.extname(file.name)
    var allowedExtension = ['.png', '.jpg', '.jpeg']
    if (!allowedExtension.includes(extensionName)) {
      return res.status(422).send('Invalid Image')
    }
    updateCat.imagePath = './files/category/images/' + file.name
    file.mv(updateCat.imagePath, (err) => {
      if (err) {
        return res.status(500).send(err)
      }
    })
  }
  const categoryName = req.body.catName
  editCat(catId, categoryName, updateCat.imagePath)
  res.redirect(303, '/categories')
}

const deleteCategory = async (req, res, next) => {
  const catId = req.params.id
  deleteCat(catId)
  res.redirect(303, '/categories', { user: req.user })
}

const showCategory = async (req, res, next) => {
  const catId = req.params.id
  const cats = await getCatDataId(catId)
  const prods = await getProdData()
  res.locals.title = 'doors'
  res.render('pages/category', { cats, prods, user: req.user })
}

// -- API --
async function getCatData () {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`)
    }
    const result = await response.json()
    return result
  } catch (err) {
    console.log(err)
  }
}

async function getCatDataId (catId) {
  try {
    const response = await fetch(url + `/${catId}`)
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`)
    }
    const result = await response.json()
    return result
  } catch (err) {
    console.log(err)
  }
}

async function createCat (categoryName, imagePath) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ categoryName, imagePath })
    })
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`)
    }
    const result = await response.json()
    return result
  } catch (err) {
    console.log(err)
  }
}

async function editCat (catId, categoryName, imagePath) {
  try {
    const response = await fetch(url + `/${catId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ categoryName, imagePath })
    })
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`)
    }
    const result = await response.json()
    return result
  } catch (err) {
    console.log(err)
  }
}

async function deleteCat (catId) {
  try {
    const response = await fetch(url + `/${catId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`)
    }
    const result = await response.json()
    return result
  } catch (err) {
    console.log(err)
  }
}

async function getProdData () {
  try {
    const response = await fetch(url2)
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`)
    }
    const result = await response.json()
    return result
  } catch (err) {
    console.log(err)
  }
}

export {
  category,
  newCategory,
  processNewCategory,
  editCategory,
  processEditCategory,
  deleteCategory,
  showCategory
}
