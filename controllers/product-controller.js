import path from 'path'
const port = process.env.PORT
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0
const url = 'https://0.0.0.0:' + port + '/api/v1/products'
const url2 = 'https://0.0.0.0:' + port + '/api/v1/categories'

const product = async (req, res, next) => {
  const prods = await getProdData()
  res.locals.title = 'Product'
  res.status(200)
  res.render('pages/products', { prods })
}

const productPage = async (req, res, next) => {
  const prodId = req.params.id
  const prod = await getProdDataId(prodId)
  res.locals.title = 'Product'
  res.status(200)
  let mss = ''
  if (prod.mssPresent === true) {
    mss = 'Modern Slavery Statement confirmed'
  } else {
    mss = 'No modern slavery statement issued by company'
  }
  res.render('pages/product', { prod, mss })
}

const newProduct = async (req, res, next) => {
  const cats = await getCatData()
  res.locals.title = 'newProduct'
  res.status(200)
  res.render('pages/newProduct', { cats })
}

const processNewProduct = async (req, res, next) => {
  const prodId = req.params.id
  var imagePath
  var mssPath
  if(!req.files){
    return res.status(400).send('No files were uploaded.')
  } else if (req.files.prodImage) {
    var file = req.files.prodImage
    var extensionName = path.extname(file.name)
    var allowedExtension = ['.png', '.jpg', '.jpeg']
    if (!allowedExtension.includes(extensionName)) {
      return res.status(422).send('Invalid Image')
    }
    imagePath = './files/products/images/' + file.name
    file.mv(imagePath, (err) => {
      if (err) {
        return res.status(500).send(err)
      }
    })
  } else if (req.files.prodMss) {
    console.log("MSS file found")
    var file = req.files.prodMss
    var extensionName = path.extname(file.name)
    var allowedExtension = ['.pdf']
    if (!allowedExtension.includes(extensionName)) {
      return res.status(422).send('Invalid file format. pdf only')
    }
    mssPath = './files/products/mss/' + file.name
    file.mv(mssPath, (err) => {
      if (err) {
        return res.status(500).send(err)
      }
    })
  }
  const productName = req.body.prodName
  const company = req.body.prodCompany
  const description = req.body.prodDescription
  const categoryName = req.body.category
  const mssPresent = true
  const familyPath = 'test path 1'
  createProd(productName, imagePath, company, description, mssPath, mssPresent, familyPath, categoryName)
  res.redirect(303, '/products')
}

const editProduct = async (req, res, next) => {
  const prodId = req.params.id
  const prods = await getProdDataId(prodId)
  const cats = await getCatData()
  res.locals.title = 'editProduct'
  res.locals.id = req.params.id
  res.status(200)
  res.render('pages/editProduct', { prods, cats })
}

const processEditProduct = async (req, res, next) => {
  const prodId = req.params.id
  var updateProd = await getProdDataId(prodId)
  if(!req.files){
  } else if (req.files.prodImage) {
    console.log("Image file found")
    var file = req.files.prodImage
    var extensionName = path.extname(file.name)
    var allowedExtension = ['.png', '.jpg', '.jpeg']
    if (!allowedExtension.includes(extensionName)) {
      return res.status(422).send('Invalid Image')
    }
    updateProd.imagePath = './files/products/images/' + file.name
    file.mv(updateProd.imagePath, (err) => {
      if (err) {
        return res.status(500).send(err)
      }
    })
  } else if (req.files.prodMss) {
    console.log("MSS file found")
    var file = req.files.prodMss
    var extensionName = path.extname(file.name)
    var allowedExtension = ['.pdf']
    if (!allowedExtension.includes(extensionName)) {
      return res.status(422).send('Invalid file format. pdf only')
    }
    updateProd.mssPath = './files/products/mss/' + file.name
    file.mv(updateProd.mssPath, (err) => {
      if (err) {
        return res.status(500).send(err)
      }
      updateProd.mssPresent = true
    })
  }
  const productName = req.body.prodName
  const company = req.body.prodCompany
  const description = req.body.prodDescription
  const categoryName = req.body.category
  const mssPresent = true
  const familyPath = 'test path 1'
  editProd(prodId, productName, updateProd.imagePath, company, description, updateProd.mssPath, updateProd.mssPresent, familyPath, categoryName)
  res.redirect(303, '/products')
}


const deleteProduct = async (req, res, next) => {
  const prodId = req.params.id
  deleteProd(prodId)
  res.redirect(303, '/products')
}

// -- API --
async function getProdData () {
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

async function getProdDataId (prodId) {
  try {
    const response = await fetch(url + `/${prodId}`)
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`)
    }
    const result = await response.json()
    return result
  } catch (err) {
    console.log(err)
  }
}

async function createProd (productName, imagePath, company, description, mssPath, mssPresent, familyPath, categoryName) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productName, imagePath, company, description, mssPath, mssPresent, familyPath, categoryName })
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

async function editProd (prodId, productName, imagePath, company, description, mssPath, mssPresent, familyPath, categoryName) {
  try {
    const response = await fetch(url + `/${prodId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productName, imagePath, company, description, mssPath, mssPresent, familyPath, categoryName })
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

async function deleteProd (prodId) {
  try {
    const response = await fetch(url + `/${prodId}`, {
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

async function getCatData () {
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
  product,
  productPage,
  newProduct,
  processNewProduct,
  editProduct,
  processEditProduct,
  deleteProduct
}
