import { Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

function AdminForms() {
  const {
    register: addProduct,
    handleSubmit: handleAddition,
    errors: addProdErrors,
  } = useForm();

  const {
    register: updateProduct,
    handleSubmit: handleUpdate,
    errors: updateErrors,
  } = useForm();

  const {
    register: delProduct,
    handleSubmit: handleDelete,
    errors: delErrors,
  } = useForm();

  const {
    register: addCategory,
    handleSubmit: handleCategory,
    errors: addCatErrors,
  } = useForm();

  const {
    register: delCategory,
    handleSubmit: handleCatDelete,
    errors: delCatErrors,
  } = useForm();

  const deleteCategory = async (cat) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/cat/${cat.id}`
      );
      alert(data);
    } catch (err) {
      alert("No category found to be removed, check the ID please");
    }
  };

  const addNewProd = async (newProd) => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/product/add`,
      newProd
    );
    alert(data);
  };

  const updateProd = async (prod) => {
    for (const [key, value] of Object.entries(prod)) {
      if (!value || value.length <= 0) {
        delete prod[key];
      }
    }
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/product/${prod.id}`,
        prod
      );
      alert(data);
    } catch (err) {
      alert("No product found to update, check the ID please");
    }
  };

  const deleteProduct = async (prod) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/product/${prod.id}`
      );
      alert(data);
    } catch (err) {
      alert("No product found to be removed, check the ID please");
    }
  };

  const addNewCat = async (newCat) => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/cat/add`,
      newCat
    );
    alert(data);
  };
  return (
    <Row>
      {/*Add Product Form*/}
      <Col lg={6}>
        <Form className="form" onSubmit={handleAddition(addNewProd)}>
          <h4>Add Product</h4>
          <Form.Group>
            <Form.Label htmlFor="name">Product Name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              name="name"
              ref={addProduct({ required: true })}
            />
            {addProdErrors.name && (
              <span className="invalid-feedback d-block ml-2">
                This field is required
              </span>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="catID">Category ID</Form.Label>
            <Form.Control
              type="text"
              id="catID"
              name="catID"
              ref={addProduct({ required: true })}
            />
            {addProdErrors.catID && (
              <span className="invalid-feedback d-block ml-2">
                This field is required
              </span>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="img">Product Image</Form.Label>
            <Form.Control
              type="text"
              id="img"
              name="img"
              ref={addProduct({ required: true })}
            />
            {addProdErrors.img && (
              <span className="invalid-feedback d-block ml-2">
                This field is required
              </span>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="desc">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="1"
              id="desc"
              name="desc"
              ref={addProduct({ required: true })}
            />
            {addProdErrors.desc && (
              <span className="invalid-feedback d-block ml-2">
                This field is required
              </span>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="price">Price</Form.Label>
            <Form.Control
              type="text"
              id="price"
              name="price"
              ref={addProduct({ required: true })}
            />
            {addProdErrors.price && (
              <span className="invalid-feedback d-block ml-2">
                This field is required
              </span>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="material">Materials</Form.Label>
            <Form.Control
              as="select"
              multiple
              id="material"
              name="material"
              ref={addProduct({ required: true })}
            >
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Bronze">Bronze</option>
              <option value="Diamond">Diamond</option>
              <option value="White-Gold">White-Gold</option>
              <option value="Platinum">Platinum</option>
              <option value="Titanium">Titanium</option>
              <option value="Copper">Copper</option>
              <option value="Gemstone">Gemstone</option>
            </Form.Control>
            {addProdErrors.material && (
              <span className="invalid-feedback d-block ml-2">
                This field is required
              </span>
            )}
          </Form.Group>
          <div className="text-center">
            <Button variant="dark" className="p-2 m-auto" type="submit">
              Add Product
            </Button>
          </div>
        </Form>
      </Col>
      {/*Update Product Form*/}
      <Col lg={6}>
        <Form className="form" onSubmit={handleUpdate(updateProd)}>
          <h4>Update Product</h4>
          <Form.Group>
            <Form.Label htmlFor="id_u">Product ID</Form.Label>
            <Form.Control
              type="text"
              id="id_u"
              name="id"
              ref={updateProduct({ required: true })}
            />
            {updateErrors.id_u && (
              <span className="invalid-feedback d-block ml-2">
                This field is required
              </span>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="name_u">Product Name</Form.Label>
            <Form.Control
              type="text"
              id="name_u"
              name="name"
              ref={updateProduct}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="catID_u">Category ID</Form.Label>
            <Form.Control
              type="text"
              id="catID_u"
              name="catID"
              ref={updateProduct}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="img_u">Product Image</Form.Label>
            <Form.Control
              type="text"
              id="img_u"
              name="img"
              ref={updateProduct}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="desc_u">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="1"
              id="desc_u"
              name="desc"
              ref={updateProduct}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="price_u">Price</Form.Label>
            <Form.Control
              type="text"
              id="price_u"
              name="price"
              ref={updateProduct}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="material_u">Materials</Form.Label>
            <Form.Control
              as="select"
              multiple
              id="material_u"
              name="material"
              ref={updateProduct}
            >
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Bronze">Bronze</option>
              <option value="Diamond">Diamond</option>
              <option value="White-Gold">White-Gold</option>
              <option value="Platinum">Platinum</option>
              <option value="Titanium">Titanium</option>
              <option value="Copper">Copper</option>
              <option value="Gemstone">Gemstone</option>
            </Form.Control>
          </Form.Group>
          <div className="text-center">
            <Button variant="dark" className="p-2" type="submit">
              Update Product
            </Button>
          </div>
        </Form>
      </Col>
      {/*Add Category Form*/}
      <Col lg={6}>
        <Form className="form" onSubmit={handleCategory(addNewCat)}>
          <h4>Add Category</h4>
          <Form.Group>
            <Form.Label htmlFor="catName">Category Name</Form.Label>
            <Form.Control
              type="text"
              id="catName"
              ref={addCategory({ required: true })}
              name="name"
            />
            {addCatErrors.name && (
              <span className="invalid-feedback d-block ml-2">
                This field is required
              </span>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="gen">Gender</Form.Label>
            <Form.Control
              as="select"
              id="gen"
              name="gen"
              ref={addCategory({ required: true })}
            >
              <option value="M">Men</option>
              <option value="W">Women</option>
            </Form.Control>
            {addCatErrors.gen && (
              <span className="invalid-feedback d-block ml-2">
                This field is required
              </span>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="src">Category Image</Form.Label>
            <Form.Control
              type="text"
              id="src"
              ref={addCategory({ required: true })}
              name="src"
            />
            {addCatErrors.src && (
              <span className="invalid-feedback d-block ml-2">
                This field is required
              </span>
            )}
          </Form.Group>
          <div className="text-center">
            <Button variant="dark" className="p-2" type="submit">
              Add Category
            </Button>
          </div>
        </Form>
      </Col>
      {/*Delete Product Form*/}
      <Col lg={6}>
        <Form className="form" onSubmit={handleDelete(deleteProduct)}>
          <h4>Delete Product</h4>
          <Form.Group>
            <Form.Label htmlFor="prodId">Product ID</Form.Label>
            <Form.Control
              type="text"
              id="prodId"
              ref={delProduct({ required: true })}
              name="id"
            />
            {delErrors.id && (
              <span className="invalid-feedback d-block ml-2">
                This field is required
              </span>
            )}
          </Form.Group>
          <div className="text-center">
            <Button variant="dark" className="p-2" type="submit">
              Delete Product
            </Button>
          </div>
        </Form>
        <Form className="form" onSubmit={handleCatDelete(deleteCategory)}>
          <h4>Delete Category</h4>
          <Form.Group>
            <Form.Label htmlFor="catId">Category ID</Form.Label>
            <Form.Control
              type="text"
              id="catId"
              ref={delCategory({ required: true })}
              name="id"
            />
            {delCatErrors.id && (
              <span className="invalid-feedback d-block ml-2">
                This field is required
              </span>
            )}
          </Form.Group>
          <div className="text-center">
            <Button variant="dark" className="p-2" type="submit">
              Delete Category
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default AdminForms;
