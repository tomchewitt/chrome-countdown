$(document).ready(function() {
    // DATES ====================================
    let dates = [];

    const $dates = $('.dates');
    const $datesAdd = $('.dates__add-save');

    addDates = () => {
        let storedDates = JSON.parse(localStorage.getItem('dates'));
        const now = new moment();

        if (storedDates) {
            // Clear dates
            $dates.html('');

            // Sort Array
            dates = storedDates.sort(function (left, right) {
                return moment.utc(left.date).diff(moment.utc(right.date))
            });

            // Add dates
            $.each(dates, (key, value) => {
                const date = new moment(value.date);
                const duration = moment.duration(date.diff(now));
                const days = Math.floor(duration.asDays());
                const weeks = Math.floor(duration.asWeeks());

                $dates.append(`<div data-date="${date}" data-name="${value.name}" class="date">
                    <span class="date__name">${value.name} <span class="date__date">(${date.format('DD/MM/YYYY')})</span></span>
                    <span class="date__days">${days}</span>
                    <span class="date__weeks">${weeks}</span>
                    <span class="date__delete">X</span>
                </div>`);
            });
        }
    }

    addDates();

    // Dates Add
    $datesAdd.on('click', (event) => {
        event.preventDefault();

        const name = $('.dates__add-name').val();
        const date = $('.dates__add-date').val();

        dates.push({ date, name });

        localStorage.setItem('dates', JSON.stringify(dates));

        addDates();
    });

    // Dates Remove
    $dates.on('click', '.date__delete', (event) => {
        const $date = $(event.currentTarget).parent();
        const name = $date.attr('data-name');
        const dates = JSON.parse(localStorage.getItem('dates'));
        const newDates = dates.filter(el => el.name !== name);

        localStorage.setItem('dates', JSON.stringify(newDates));

        $date.remove();
    });


    // PROJECTS ====================================
    let projects = [];

    const $projects = $('.projects');
    const $projectsAdd = $('.projects__add-save');

    addProjects = () => {
        projects = JSON.parse(localStorage.getItem('projects'));

        if (projects) {
            // Clear Projects
            $projects.html('');

            // Add Projects
            $.each(projects, (key, value) => {
                $projects.append(`<div data-name="${value}" class="project">
                        <span class="project__name">${value}</span>
                        <span class="project__delete">X</span>
                    </div>`);
            });
        }
    }

    addProjects();

    // Projects Add
    $projectsAdd.on('click', (event) => {
        event.preventDefault();

        const name = $('.projects__add-name').val();

        projects.push(name);

        localStorage.setItem('projects', JSON.stringify(projects));

        addProjects();

        $('.projects__add-name').val('');
    });

    // Projects Remove
    $projects.on('click', '.project__delete', (event) => {
        const $project = $(event.currentTarget).parent();
        const name = $project.attr('data-name');
        const projects = JSON.parse(localStorage.getItem('projects'));
        const newProjects = projects.filter(el => el.name !== name);

        localStorage.setItem('projects', JSON.stringify(newProjects));

        $project.remove();
    });
});



