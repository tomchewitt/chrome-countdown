$(document).ready(function() {
    const svg = `<svg viewBox="0 0 276.2 337.2">
        <path d="M259.1,52.8c-5.2-0.2-10.3,0-15.5,0c-12.1,0-24.2,0-37.1,0c0-4.5,0.2-8.5,0-12.4c-1-19.8-14.2-37.1-33.7-38.8
            c-23-2-46.4-2-69.3,0C84,3.2,70.8,20.7,69.8,40.4c-0.2,3.9,0,7.9,0,12.4c-3.8,0-6.6,0-9.4,0c-14.5,0-29-0.1-43.5,0
            C7.1,52.9,0,60,0,68.9c0,9.1,7.2,15.9,16.8,16c2.9,0,5.9,0,9.3,0c0,2.6,0,4.6,0,6.5c0,72.3,0.1,144.6,0,216.9
            c0,17.5,12.8,28.9,28.7,28.8c55.6-0.6,111.3-0.5,166.9,0c14.7,0.1,28.4-10.3,28.4-28.5c-0.1-54.1,0-108.3-0.1-162.4
            c0-20.1,0-40.3,0-61.3c3.1,0,5.8,0,8.6,0c10.2,0,17.5-6.5,17.6-15.7C276.4,60,269.3,53.1,259.1,52.8z M95.9,282.7
            c0,9.3-8.2,14.7-15.5,10.3c-4.2-2.5-5.2-6.6-5.1-11.2c0.1-27.3,0-54.6,0-82c0-26.3,0-52.7,0-79c0-6.9,3.3-11.3,8.8-12
            c6.9-0.8,11.8,3.7,11.8,11.4c0.1,20.2,0,40.3,0,60.5c0,6.8,0,13.7,0,20.5C95.9,228.4,96,255.5,95.9,282.7z M142,293.6
            c-4,1.8-7.9,1.1-10.5-2c-1.9-2.3-3.2-5.9-3.2-8.9c-0.2-39.5-0.2-79-0.2-118.4c0-14.7,0-29.3,0-44c0-7.5,3.6-11.5,10-11.5
            c6.4,0,10,4,10,11.6c0,27.2,0,54.3,0,81.5c0,27.3,0,54.6,0,82C148.2,288.4,146.2,291.7,142,293.6z M101.4,52.6
            c0.3-4.6,0.1-9.1,1-13.4c0.8-4.1,3.8-6.5,8.3-6.5c18.1,0,36.3,0,54.4,0c5.1,0,8.2,2.7,9,7.6c0.6,3.9,0.4,7.9,0.6,12.3
            C149.9,52.6,126.2,52.6,101.4,52.6z M200.9,282.2c0,9.8-7.9,15.2-15.5,10.7c-4-2.4-5.1-6.2-5.1-10.7c0-26.8,0-53.7,0-80.5
            c0-27,0-54,0-81c0-7.2,3.4-11.6,9.3-12c6.9-0.5,11.3,3.9,11.3,11.5c0.1,24.3,0,48.7,0,73C200.9,222.9,200.9,252.5,200.9,282.2z"/>
        </svg>`;

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

                $dates.append(`<div data-date="${date}" data-name="${value.name}" class="date item">
                    <span class="date__name">${value.name} <span class="date__date">(${date.format('DD/MM/YYYY')})</span></span>
                    <span class="date__days">${days}</span>
                    <span class="date__weeks">${weeks}</span>
                    <span class="date__delete button__delete">${svg}</span>
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

        $('.dates__add-name').val('');
        $('.dates__add-date').val('');
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
                $projects.append(`<div data-name="${value}" class="project item">
                        <span class="project__name">${value}</span>
                        <span class="project__delete button__delete">${svg}</span>
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
        const newProjects = projects.filter(el => el !== name);

        localStorage.setItem('projects', JSON.stringify(newProjects));

        $project.remove();
    });
});
