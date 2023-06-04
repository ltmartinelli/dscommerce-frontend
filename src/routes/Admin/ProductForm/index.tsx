import { Link, useNavigate, useParams } from 'react-router-dom';
import './styles.css'
import { useEffect, useState } from 'react';
import FormInput from '../../../components/FormInput';
import * as forms from '../../../utils/forms.ts'
import * as productService from '../../../services/product-service.ts';
import * as categoryService from '../../../services/category-service.ts';
import FormTextArea from '../../../components/FormTextArea/index.tsx';
import { CategoryDTO } from '../../../models/category.ts';
import FormSelect from '../../../components/FormSelect/index.tsx';
import { selectStyles } from '../../../utils/select.ts';


export default function ProductForm()
{

  const params = useParams();

  const navigate = useNavigate();

  const isEditing = params.productId !== 'create';

  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  const [formData, setFormData] = useState<any>({
    name: {
      value: "",
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Nome",
      validation: function (nameValue: string) { return nameValue.length >= 3 && nameValue.length <= 80; },
      message: "Favor informar um nome de 3 a 80 caracteres."
    },
    price: {
      value: "",
      id: "price",
      name: "price",
      type: "number",
      placeholder: "Preço",
      validation: function (priceValue: any)
      {
        return Number(priceValue) > 0
      },
      message: "Favor informar um valor positivo."
    },
    imgUrl: {
      value: "",
      id: "imgUrl",
      name: "imgUrl",
      type: "text",
      placeholder: "Imagem",
    },
    description: {
      value: "",
      id: "description",
      name: "description",
      type: "text",
      placeholder: "Descrição",
      validation: function (nameValue: string) { return nameValue.length >= 10 },
      message: "Favor informar uma descrição de no mínimo 10 caracteres."
    },
    categories: {
      value: [],
      id: "categories",
      name: "categories",
      placeholder: "Categorias",
      validation: function (categoryValue: CategoryDTO[]) { return categoryValue.length > 0 },
      message: "Favor selecionar ao menos uma categoria."
    }
  })

  useEffect(() =>
  {
    categoryService.findAllRequest()
      .then(response => setCategories(response.data))
  }, [])

  useEffect(() =>
  {
    if (isEditing)
    {
      productService.findById(Number(params.productId))
        .then(response =>
        {
          setFormData(forms.updateAll(formData, response.data));
        });
    }
  }, [])

  function handleInputChange(event: any)
  {
    const name = event.target.name;
    const value = event.target.value;

    const result = forms.updateAndValidate(formData, name, value);
    setFormData(result);
  }

  function handleTurnDirty(name: string)
  {
    const newFormData = forms.dirtyAndValidate(formData, name);
    setFormData(newFormData);
  }

  function handleSubmit(event: any)
  {
    event.preventDefault();
    const formDataValidated = forms.dirtyAndValidateAll(formData);

    if (forms.hasAnyInvalid(formDataValidated))
    {
      setFormData(formDataValidated);
      return;
    }

    const requestBody = forms.toValues(formData);

    if (isEditing) { requestBody.id = params.productId; }

    const request = isEditing ?
      productService.updateRequest(requestBody)
      :
      productService.insertRequest(requestBody)

    request.then(() => { navigate("/admin/products") });
  }

  return (
    <main>
      <section id="product-form-section" className="dsc-container">
        <div className="dsc-product-form-container">
          <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
            <h2>Dados do produto</h2>
            <div className="dsc-form-controls-container">

              <div>
                <FormInput
                  {...formData.name}
                  className="dsc-form-control"
                  onTurnDirty={handleTurnDirty}
                  onChange={handleInputChange}
                />
                <div className="dsc-form-error">{formData.name.message}</div>
              </div>

              <div>
                <FormInput
                  {...formData.price}
                  className="dsc-form-control"
                  onTurnDirty={handleTurnDirty}
                  onChange={handleInputChange}
                />
                <div className="dsc-form-error">{formData.price.message}</div>
              </div>

              <div>
                <FormInput
                  {...formData.imgUrl}
                  className="dsc-form-control"
                  onTurnDirty={handleTurnDirty}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <FormSelect
                  {...formData.categories}
                  className="dsc-form-control dsc-form-select-container"
                  styles={selectStyles}
                  options={categories}
                  onTurnDirty={handleTurnDirty}
                  onChange={(obj: any) =>
                  {
                    const newFormData = forms.updateAndValidate(formData, "categories", obj);
                    setFormData(newFormData);
                  }}
                  isMulti
                  getOptionLabel={(obj: any) => obj.name}
                  getOptionValue={(obj: any) => String(obj.id)}
                />
                <div className="dsc-form-error">{formData.categories.message}</div>
              </div>

              <div>
                <FormTextArea
                  {...formData.description}
                  className="dsc-form-control dsc-textarea"
                  onTurnDirty={handleTurnDirty}
                  onChange={handleInputChange}
                />
                <div className="dsc-form-error">{formData.description.message}</div>
              </div>

            </div>

            <div className="dsc-product-form-buttons">
              <Link to="/admin/products">
                <button type="reset" className="dsc-btn dsc-btn-white">Cancelar</button>
              </Link>
              <button type="submit" className="dsc-btn dsc-btn-blue">Salvar</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}