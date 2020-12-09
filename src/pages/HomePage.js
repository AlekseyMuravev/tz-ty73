import React, { useRef, useState } from 'react';
import Select from '../components/Select';

function HomePage() {
    const sexArr = [{ name: "Мужской", value: 1 }, { name: "Женский", value: 2 }];
    const lifestyleArr = [{ name: "Малоподвижный", value: 1.2 }, { name: "Низкая активность", value: 1.55 }, { name: "Умеренная активность", value: 1.55 }, { name: "Активный", value: 1.725 }];
    const purposeArr = [{ name: "Снижение массы тела", value: -500 }, { name: "Сохранение массы тела", value: 0 }, { name: "Увеличение массы тела", value: 200 }];

    const [form, setForm] = useState({
        surname: { value: null, type: "Фамилия" },
        name: { value: null, type: "Имя" },
        middleName: { value: null, type: "Отчество" },
        sex: { value: null, type: "Пол" },
        dateOfBirth: { value: null, type: "Дата рождения" },
        weight: { value: null, type: "Вес" },
        growth: { value: null, type: "Рост" },
        lifestyle: { value: null, type: "Образ жизни" },
        purpose: { value: null, type: "Цель" },
    })

    const [views, setViews] = useState({
        sex: false,
        lifestyle: false,
        purpose: false
    })

    const [selects, setSelects] = useState({
        sex: '',
        lifestyle: '',
        purpose: ''
    })

    function handleForm(evt) {
        setForm({
            ...form,
            [evt.target.name]: {
                ...form[evt.target.name],
                value: evt.target.value
            }
        })
    }

    function handleOptionsViews(evt) {
        setViews({
            ...views,
            [evt.target.name]: !views[evt.target.name]
        })
    }

    function submitForm() {
        let summ;
        let alertText = '';
        for (let key in form) {
            if (key !== "middleName" && form[key].value == null) {
                alertText += `${form[key].type}, `;
            } else if (key !== "middleName" && form[key].value.trim() == '') {
                alertText += `${form[key].type}, `;
            }
        }

        if (alertText > '') {
            return alert(`Заполните поля: ${alertText}`);
        }

        console.log(form);
        let fullYear = Math.floor((new Date() - new Date(form.dateOfBirth.value)) / 1000 / 60 / 60 / 24 / 365);
        if (form.sex === '1') {
            summ = form.lifestyle.value * (10 * form.weight.value + 6.25 * form.growth.value - 5 * fullYear + 5) + +form.purpose.value;
        } else {
            summ = form.lifestyle.value * (10 * form.weight.value + 6.25 * form.growth.value - 5 * fullYear - 16) + +form.purpose.value;
        }
        alert('Итог: ' + summ)
    }

    return (
        <div className="form">
            <div className="item">
                <label htmlFor="surname">Фамилия</label>
                <input type="text" name="surname" id="surname" onChange={handleForm}></input>
            </div>
            <div className="item">
                <label htmlFor="name">Имя</label>
                <input type="text" name="name" id="name" onChange={handleForm}></input>
            </div>
            <div className="item">
                <label htmlFor="middleName">Отчество</label>
                <input type="text" name="middleName" id="middleName" onChange={handleForm}></input>
            </div>
            <div className="item">
                <label htmlFor="sex">Пол</label>
                <input className="select" name="sex" id="sex" onChange={handleForm} value={selects.sex} readOnly onClick={handleOptionsViews}></input>
                {views.sex && <Select data={sexArr} setViews={setViews} views={views} inputName={"sex"} setForm={setForm} form={form} selects={selects} setSelects={setSelects} />}
            </div>
            <div className="item">
                <label htmlFor="dateOfBirth">Дата рождения</label>
                <input type="date" name="dateOfBirth" id="dateOfBirth" onChange={handleForm}></input>
            </div>
            <div className="item">
                <label htmlFor="weight">Вес, кг</label>
                <input type="number" name="weight" id="weight" onChange={handleForm}></input>
            </div>
            <div className="item">
                <label htmlFor="growth">Рост, см</label>
                <input type="number" name="growth" id="growth" onChange={handleForm}></input>
            </div>
            <div className="item">
                <label htmlFor="lifestyle">Образ жизни</label>
                <input className="select" name="lifestyle" id="lifestyle" onChange={handleForm} value={selects.lifestyle} readOnly onClick={handleOptionsViews}></input>
                {views.lifestyle && <Select data={lifestyleArr} setViews={setViews} views={views} inputName={"lifestyle"} setForm={setForm} form={form} selects={selects} setSelects={setSelects} />}
            </div>
            <div className="item">
                <label htmlFor="purpose">Цель</label>
                <input className="select" name="purpose" id="purpose" onChange={handleForm} value={selects.purpose} readOnly onClick={handleOptionsViews}></input>
                {views.purpose && <Select data={purposeArr} setViews={setViews} views={views} inputName={"purpose"} setForm={setForm} form={form} selects={selects} setSelects={setSelects} />}
            </div>
            <button onClick={submitForm}>Отправить</button>
        </div>
    )
}

export default HomePage
