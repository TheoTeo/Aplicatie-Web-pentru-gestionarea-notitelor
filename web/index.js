
function main() {
    window.addEventListener('render', event => eval(event.call));
    window.addEventListener('hashchange', event => {
        let index = event.newURL.indexOf('#');
        if (index > -1) {
            event.preventDefault();
            let call = event.newURL.substring(index + 1);
            let render = new Event('render');
            render.call = call;
            window.dispatchEvent(render);
        }
    });
    const views = {};
    async function loadView(view) {
        if (!views[view]) {
            const response = await fetch(`/views/${view}.html`);
            views[view] = await response.text();
        }
        return Handlebars.compile(views[view]);
    };
    function render(view, data) {
        document.getElementById('main').innerHTML = view(data);
    };

    async function loadCollection(collection, filter) {
        const response = await fetch(`/${collection}${filter ? filter : ''}`);
        return response.status === 200 ? await response.json() : [];
    }
    async function loadRecord(collection, id) {
        if (id.length > 0) {
            const response = await fetch(`/${collection}/${id}`);
            return response.status === 200 ? await response.json() : {};
        } else {
            return {};
        }
    }

    async function loadHome() {
        window.location.href = '#loadHome()';
        const view = await loadView('home');
        render(view);
    };

    async function loadLogare() {
        const view = await loadView('logare');

        render(view);

        addEventListenersLogare('users');
    }

    async function loadCursuri() {
        const view = await loadView('cursuri');

        const dataNotite = {
            notite: await loadCollection('notite')
        };

        const dataCursuri = {
            cursuri: []
        }



        for (let i = 0; i < dataNotite.notite.length; i++) {
            if ((dataNotite.notite[i].tip == 'c' || dataNotite.notite[i].tip == 'C')
                && dataNotite.notite[i].usersId == localStorage.getItem("idUtilizator"))
                dataCursuri.cursuri.push(dataNotite.notite[i]);
        };

        render(view, { ...dataCursuri });

        input = document.getElementById("keywords");
        input.onchange = async (event) => {
            const text = input.value;
            dataCursuri.cursuri = dataCursuri.cursuri.sort(function (a, b) {
                if (a.title.includes(text)) return -1;
                if (b.title.includes(text)) return 1;
                return 0;

            });
            const viewCursuri = await loadView('cursuri');
            render(viewCursuri, { ...dataCursuri });

        }




        addEventListenersSelectieSortare("notite");
    }

    async function addEventListenersSelectieSortare(collection) {
        const select = document.getElementById('sortareCursuri');
        select.action = 'javascript:void(0)';
        record = {};

        const dataNotite = {
            notite: await loadCollection('notite')
        };

        const dataCursuri = {
            cursuri: []
        }
        const dataDiscipline = {
            discipline: await loadCollection("discipline")
        }

        for (let i = 0; i < dataNotite.notite.length; i++) {
            if ((dataNotite.notite[i].tip == 'c' || dataNotite.notite[i].tip == 'C')
                && dataNotite.notite[i].usersId == localStorage.getItem("idUtilizator"))
                dataCursuri.cursuri.push(dataNotite.notite[i]);
        };
        select.onchange = async (event) => {
            option = select.options[select.selectedIndex];
            if (option.value == "Data") {
                dataCursuri.cursuri = dataCursuri.cursuri.sort(function (a, b) {
                    let dataA = a.date.split("/");
                    let dataB = b.date.split("/");
                    let valoare = 0;

                    if (dataA[2] == dataB[2]) {
                        if (dataA[1] == dataB[1]) {
                            if (dataA[0] == dataB[0]) {
                                valoare = 0;
                            };
                        }
                        else {
                            if (dataA[0] > dataB[0]) {
                                valoare = 1;
                            }
                            else { valoare = -1; }
                        }


                    }
                    else if (dataA[2] > dataB[2]) {
                        valoare = 1;
                    }
                    else valoare = -1;
                    return valoare;
                });
                const viewCursuri = await loadView('cursuri');
                render(viewCursuri, { ...dataCursuri });
            }
            if (option.value == "Materie") {
                dataCursuri.cursuri = dataCursuri.cursuri.sort(function (a, b) {
                    let dataA = a.disciplineId;
                    let dataB = b.disciplineId;
                    let titluDisciplinaA = ""
                    let titluDisciplinaB = ""
                    for (let i = 0; i < dataDiscipline.discipline.length; i++) {
                        const disciplina = dataDiscipline.discipline[i];
                        if (dataA == disciplina.id) {
                            titluDisciplinaA = disciplina.title;
                        }
                        if (dataB == disciplina.id) {
                            titluDisciplinaB = disciplina.title;
                        }
                    }

                    if (titluDisciplinaA < titluDisciplinaB) { return -1; }
                    if (titluDisciplinaA > titluDisciplinaB) { return 1; }
                    return 0;
                });
                const viewCursuri = await loadView('cursuri');
                render(viewCursuri, { ...dataCursuri });
            }

        }
    }


    async function loadSeminarii() {
        const view = await loadView('seminarii');

        const dataNotite = {
            notite: await loadCollection('notite')
        };

        const dataCursuri = {
            cursuri: []
        }



        for (let i = 0; i < dataNotite.notite.length; i++) {
            if ((dataNotite.notite[i].tip == 's' || dataNotite.notite[i].tip == 'S')
                && dataNotite.notite[i].usersId == localStorage.getItem("idUtilizator"))
                dataCursuri.cursuri.push(dataNotite.notite[i]);
        };

        render(view, { ...dataCursuri });

        input = document.getElementById("keywords");
        input.onchange = async (event) => {
            const text = input.value;
            dataCursuri.cursuri = dataCursuri.cursuri.sort(function (a, b) {
                if (a.title.includes(text)) return -1;
                if (b.title.includes(text)) return 1;
                return 0;

            });
            const viewCursuri = await loadView('seminarii');
            render(viewCursuri, { ...dataCursuri });

        }




        addEventListenersSelectieSortareSeminare("notite");
    }

    async function addEventListenersSelectieSortareSeminare(collection) {
        const select = document.getElementById('sortareSeminare');
        select.action = 'javascript:void(0)';
        record = {};

        const dataNotite = {
            notite: await loadCollection('notite')
        };

        const dataCursuri = {
            cursuri: []
        }
        const dataDiscipline = {
            discipline: await loadCollection("discipline")
        }

        for (let i = 0; i < dataNotite.notite.length; i++) {
            if ((dataNotite.notite[i].tip == 's' || dataNotite.notite[i].tip == 'S')
                && dataNotite.notite[i].usersId == localStorage.getItem("idUtilizator"))
                dataCursuri.cursuri.push(dataNotite.notite[i]);
        };
        select.onchange = async (event) => {
            option = select.options[select.selectedIndex];
            if (option.value == "Data") {
                dataCursuri.cursuri = dataCursuri.cursuri.sort(function (a, b) {
                    let dataA = a.date.split("/");
                    let dataB = b.date.split("/");
                    let valoare = 0;

                    if (dataA[2] == dataB[2]) {
                        if (dataA[1] == dataB[1]) {
                            if (dataA[0] == dataB[0]) {
                                valoare = 0;
                            };
                        }
                        else {
                            if (dataA[0] > dataB[0]) {
                                valoare = 1;
                            }
                            else { valoare = -1; }
                        }


                    }
                    else if (dataA[2] > dataB[2]) {
                        valoare = 1;
                    }
                    else valoare = -1;
                    return valoare;
                });
                const viewCursuri = await loadView('cursuri');
                render(viewCursuri, { ...dataCursuri });
            }
            if (option.value == "Materie") {
                dataCursuri.cursuri = dataCursuri.cursuri.sort(function (a, b) {
                    let dataA = a.disciplineId;
                    let dataB = b.disciplineId;
                    let titluDisciplinaA = ""
                    let titluDisciplinaB = ""
                    for (let i = 0; i < dataDiscipline.discipline.length; i++) {
                        const disciplina = dataDiscipline.discipline[i];
                        if (dataA == disciplina.id) {
                            titluDisciplinaA = disciplina.title;
                        }
                        if (dataB == disciplina.id) {
                            titluDisciplinaB = disciplina.title;
                        }
                    }

                    if (titluDisciplinaA < titluDisciplinaB) { return -1; }
                    if (titluDisciplinaA > titluDisciplinaB) { return 1; }
                    return 0;
                });
                const viewCursuri = await loadView('cursuri');
                render(viewCursuri, { ...dataCursuri });
            }

        }
    }


    async function loadInregistrare() {
        const view = await loadView('inregistrare');
        const data = {
        }
        render(view);

        addEventListenersInregistrare('users');
    }

    function addEventListenersInregistrare(collection) {
        const form = document.getElementById('formInregistare');
        form.action = 'javascript:void(0)';
        record = {};

        form.onsubmit = async (event) => {
            const emailInregistrare = document.getElementById('emailInregistrare').value;
            const passwordInregistrare = document.getElementById('passwordInregistrare').value;

            record.email = emailInregistrare;
            record.parola = passwordInregistrare;

            const data = {
                users: await loadCollection(collection)
            };
            let exista = false;
            for (let i = 0; i < data.users.length; i++) {
                const user = data.users[i];
                if (user.email == emailInregistrare) {
                    exista = true;
                    break;
                }
            };

            if (!exista) {
                if (!emailInregistrare.match("^[a-z0-9](\.?[a-z0-9]){3,}@stud.ase.ro")) {
                    alert("trebuie sa contina @stud.ase.ro");
                }
                else {
                    const response = await fetch(`/${collection}/`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' }, // de tinut minte ce?????????????
                        body: JSON.stringify(record)
                    }).catch(error => alert(error.message));
                    window.location.href = '#loadLogare()';
                };
            }
            else {
                alert("Exista deja utilizator cu acest email");
            }

        }
    }


    function addEventListenersLogare(collection) {
        const form = document.getElementById('formLogare');
        form.action = 'javascript:void(0)';
        record = {};

        form.onsubmit = async (event) => {
            const emailInregistrare = document.getElementById('emailLogare').value;
            const passwordInregistrare = document.getElementById('passwordLogare').value;

            const data = {
                users: await loadCollection(collection)
            };

            let gasit = true;
            for (let i = 0; i < data.users.length; i++) {
                const user = data.users[i];
                if (user.email == emailInregistrare) {
                    if (user.parola == passwordInregistrare) {
                        alert("Autentificare cu succes!");
                        window.location.href = '#loadHome()';
                        gasit = true;
                        localStorage.setItem("idUtilizator", user.id);
                        break;
                    }
                    alert("Parola gresita!");
                    break;
                }
                gasit = false;
            }

            if (gasit == false) {
                alert("Email negasit!");
                document.getElementById('emailLogare').value = "";
                document.getElementById('passwordLogare').value = "";
            }


        }
    }

    async function loadNotita(id) {
        const view = await loadView('notita');
        const data = {
            curs: await loadRecord("notite", id)
        }

        render(view, { ...data });
        let string_nou = data.curs.continut
        inputList = string_nou.split("/*");
        let string_final = "";
        for (let i = 0; i < inputList.length; i++) {
            string_final = string_final + "" + inputList[i]
            if (i != inputList.length - 1) {
                string_final = string_final + "</b>"
            }
        }

        let string_nou2 = string_final
        inputList2 = string_nou2.split("*");
        let string_final2 = "";
        for (let i = 0; i < inputList2.length; i++) {
            string_final2 = string_final2 + "" + inputList2[i]
            if (i != inputList2.length - 1) {
                string_final2 = string_final2 + "<b>"
            }
        }

        let string_nou3 = string_final2
        inputList3 = string_nou3.split("--");
        let string_final3 = "";
        for (let i = 0; i < inputList3.length; i++) {
            string_final3 = string_final3 + "" + inputList3[i]
            if (i != inputList3.length - 1) {
                string_final3 = string_final3 + "<br>"
            }
        }
        let string_nou4 = string_final3
        inputList4 = string_nou4.split("/%");
        let string_final4 = "";
        for (let i = 0; i < inputList4.length; i++) {
            string_final4 = string_final4 + "" + inputList4[i]
            if (i != inputList4.length - 1) {
                string_final4 = string_final4 + "</i>"
            }
        }
        let string_nou5 = string_final4
        inputList5 = string_nou5.split("%");
        let string_final5 = "";
        for (let i = 0; i < inputList5.length; i++) {
            string_final5 = string_final5 + "" + inputList5[i]
            if (i != inputList5.length - 1) {
                string_final5 = string_final5 + "<i>"
            }
        }


        let string_nou6 = string_final5
        inputList6 = string_nou6.split("/@");
        let string_final6 = "";
        for (let i = 0; i < inputList6.length; i++) {
            string_final6 = string_final6 + "" + inputList6[i]
            if (i != inputList6.length - 1) {
                string_final6 = string_final6 + "</h1>"
            }
        }


        let string_nou7 = string_final6
        inputList7 = string_nou7.split("@");
        let string_final7 = "";
        for (let i = 0; i < inputList7.length; i++) {
            string_final7 = string_final7 + "" + inputList7[i]
            if (i != inputList7.length - 1) {
                string_final7 = string_final7 + "<h1>"
            }
        }

        let string_nou8 = string_final7
        inputList8 = string_nou8.split("/$");
        let string_final8 = "";
        for (let i = 0; i < inputList8.length; i++) {
            string_final8 = string_final8 + "" + inputList8[i]
            if (i != inputList8.length - 1) {
                string_final8 = string_final8 + "</h4>"
            }
        }

        let string_nou9 = string_final8
        inputList9 = string_nou9.split("$");
        let string_final9 = "";
        for (let i = 0; i < inputList9.length; i++) {
            string_final9 = string_final9 + "" + inputList9[i]
            if (i != inputList9.length - 1) {
                string_final9 = string_final9 + "<h4>"
            }
        }

        let string_nou10 = string_final9
        inputList10 = string_nou10.split("/]");
        let string_final10 = "";
        for (let i = 0; i < inputList10.length; i++) {
            string_final10 = string_final10 + "" + inputList10[i]
            if (i != inputList10.length - 1) {
                string_final10 = string_final10 + "</ul>"
            }
        }

        let string_nou11 = string_final10
        inputList11 = string_nou11.split("[");
        let string_final11 = "";
        for (let i = 0; i < inputList11.length; i++) {
            string_final11 = string_final11 + "" + inputList11[i]
            if (i != inputList11.length - 1) {
                string_final11 = string_final11 + "<ul>"
            }
        }

        let string_nou12 = string_final11
        inputList12 = string_nou12.split("/)");
        let string_final12 = "";
        for (let i = 0; i < inputList12.length; i++) {
            string_final12 = string_final12 + "" + inputList12[i]
            if (i != inputList12.length - 1) {
                string_final12 = string_final12 + "</li>"
            }
        }

        let string_nou13 = string_final12
        inputList13 = string_nou13.split("(");
        let string_final13 = "";
        for (let i = 0; i < inputList13.length; i++) {
            string_final13 = string_final13 + "" + inputList13[i]
            if (i != inputList13.length - 1) {
                string_final13 = string_final13 + "<li>"
            }
        }
        let string_nou14 = string_final13
        inputList14 = string_nou14.split("/~");
        let string_final14 = "";
        for (let i = 0; i < inputList14.length; i++) {
            string_final14 = string_final14 + "" + inputList14[i]
            if (i != inputList14.length - 1) {
                string_final14 = string_final14 + "></img>"
            }
        }


        let string_nou15 = string_final14
        inputList15 = string_nou15.split("~");
        let string_final15 = "";
        for (let i = 0; i < inputList15.length; i++) {
            string_final15 = string_final15 + "" + inputList15[i]
            if (i != inputList15.length - 1) {
                string_final15 = string_final15 + "<img src="
            }
        }


        document.getElementById("markdown").innerHTML = string_final15


    }

    async function addCurs() {
        const view = await loadView('addNotita');

        render(view);

        addEventListenersAddNotita("notite");
    }

    function addEventListenersAddNotita(collection) {
        const form = document.getElementById('formAddNotita');

        form.action = 'javascript:void(0)';

        let record = {};

        form.onsubmit = async (event) => {
            const idAddTitlu = document.getElementById('idAddTitlu').value;
            const idAddContinut = document.getElementById('idAddContinut').value;
            const tipNotita = document.getElementById('tipNotita').value;

            record.title = idAddTitlu;
            record.continut = idAddContinut;
            record.tip = tipNotita;
            record.usersId = localStorage.getItem("idUtilizator");

            //date
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();

            today = dd + '/' + mm + '/' + yyyy;

            record.date = today;

            const response = await fetch(`/${collection}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(record)
            }).catch(error => alert(error.message));
            window.location.href = '#loadHome()';


        }
    }

    async function editNotita(id) {
        const view = await loadView('editNotita');

        render(view);

        addEventListenersEditNotita(id);
    }

    async function deleteNotita(id) {
        let collection = 'notite';

        if (id) {
            const response = await fetch(`/${collection}/${id}`, {
                method: 'DELETE'
            }).catch(error => alert(error.message));
            if (response.status === 204) {
                window.location.href = '#loadHome()';
            }
        }
    }

    async function addEventListenersEditNotita(id) {
        const form = document.getElementById('formEditNotita');
        let collection = 'notite';

        form.action = 'javascript:void(0)';

        const notita = await loadRecord(collection, id);

        console.log(notita);

        document.getElementById('idAddTitlu').value = notita.title;
        document.getElementById('idAddContinut').value = notita.continut;
        document.getElementById('tipNotita').value = notita.tip;
        // document.getElementById('tipNotita').innerHTML = 


        form.onsubmit = async (event) => {
            notita.title = document.getElementById('idAddTitlu').value;
            notita.continut = document.getElementById('idAddContinut').value;
            notita.tip = document.getElementById('tipNotita').value;

            const response = await fetch(`/${collection}/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(notita)
            }).catch(error => alert(error.message));
            window.location.href = '#loadHome()';


        }

    }

    function delogare() {
        localStorage.setItem("idUtilizator", "");
    }

    async function partajareUtilizator(id) {
        const view = await loadView('partajare');

        render(view);

        addEventListenersPartajare(id);
    }

    async function addEventListenersPartajare(id) {
        const form = document.getElementById('formPartajare');
        form.action = 'javascript:void(0)';
        let collection = 'notite';

        const data = {
            users: await loadCollection('users')
        };



        const notita = await loadRecord(collection, id);



        form.onsubmit = async (event) => {
            const email = document.getElementById("emailPartajare").value;


            userPentruPartajare = null;

            let exista = false;
            for (let i = 0; i < data.users.length; i++) {
                const user = data.users[i];
                if (user.email == email) {
                    exista = true;
                    userPentruPartajare = user;
                    break;
                }
            };


            if (exista) {
                notitaNoua = {};
                notitaNoua.title = notita.title;
                notitaNoua.continut = notita.continut;
                notitaNoua.tip = notita.tip;
                notitaNoua.usersId = userPentruPartajare.id;
                notitaNoua.date = notita.date;

                const response = await fetch(`/${collection}/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(notitaNoua)
                }).catch(error => alert(error.message));
                window.location.href = '#loadHome()';
            }
            else {
                alert("Utilizatorul nu exista!");
            }

        }

    }

    //discipline
    async function loadDiscipline(id) {
        const view = await loadView('discipline');

        const data = {
            discipline: await loadCollection("discipline")
        }

        let dataCuId = {};
        dataCuId.data = data;
        dataCuId.idNotita = id;

        for (let i = 0; i < dataCuId.data.discipline.length; i++) {
            dataCuId.data.discipline[i].idNotita = id;
        }

        render(view, { ...dataCuId });

    }

    async function addDisciplina(id) {
        const view = await loadView('addDisciplina');

        render(view);

        addEventListenersAddDisciplina('discipline', id);
    }

    async function addEventListenersAddDisciplina(collection, id) {
        const form = document.getElementById('formAdaugaDisciplina');
        form.action = 'javascript:void(0)';

        record = {};

        form.onsubmit = async (event) => {
            {
                const titluDisciplina = document.getElementById('titluDisciplina').value;

                if (titluDisciplina.length >= 2) {
                    record.title = titluDisciplina;

                    const response = await fetch(`/${collection}/`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' }, // de tinut minte ce?????????????
                        body: JSON.stringify(record)
                    }).catch(error => alert(error.message));
                    window.location.href = `#loadDiscipline('${id}')`;
                }

            }

        }
    }

    async function modificaDisciplina(idNotita, idDisciplina) {
        let collection = 'notite';

        let notita = {};

        notita.disciplineId = idDisciplina;

        const response = await fetch(`/${collection}/${idNotita}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(notita)
        }).catch(error => alert(error.message));
        window.location.href = '#loadHome()';

    }
    //discipline


    loadHome();
}