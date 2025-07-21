import "./EditPortfolio.css"
import { useFieldArray, useForm } from "react-hook-form"
import $api from '../../../http/index'
import { useSelector } from "react-redux"
import { useEffect } from "react"

function EditPortfolio({ onClose }) {
    const { register, control, handleSubmit, reset } = useForm({
        defaultValues: {
            fullname: "",
            about: "",
            skills: "",
            contacts: []
        }
    });
    const username = useSelector((state) => state.user.username);

    const { fields, append, remove } = useFieldArray({
        control,
        name: "contacts"
    })

    const onSubmit = (data) => {
        $api.put(`/user/${username}`, data)
            .then(res => {
                onClose()
            })
            .catch(err => {
                console.error("Ошибка обновления пользователя:", err);
            })
    }

    useEffect(() => {
        $api.get(`/user/${username}`)
            .then(res => {
                reset(res.data)
            })
            .catch(err => {
                console.error("Ошибка загрузки пользователя:", err);
            })
    }, [username, reset])

    return (
        <div className="portfolio-editor">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Имя:</h3>
                <input {...register('fullname')} />

                <h3>О себе:</h3>
                <textarea {...register('about')} />

                <h3>Навыки:</h3>
                <textarea {...register('skills')} />

                <h3>Контакты:</h3>
                {fields.map((field, index) => (
                    <div key={field.id} className="portfolio-editor-contacts">
                            <input 
                                {...register(`contacts.${index}.name`)}
                                placeholder="Название"
                            />

                            <input 
                                {...register(`contacts.${index}.link`)}
                                placeholder="Ссылка"
                            />

                        <button id="delete-button" type="button" onClick={() => remove(index)}>
                            Удалить
                        </button>
                    </div>
                ))}

                <button id="add-button" type="button" onClick={() => append({ name: '', link: '' })}>
                    +
                </button>

                <div className="portfolio-editor-footer">
                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={onClose}>Отмена</button>
                </div>
            </form>
        </div>
    )
}

export default EditPortfolio