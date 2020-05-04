function fillAvatar(data) {
  var avatar = document.querySelector('#avatar');
  var photo = document.createElement('img');
  var fileOpen = document.createElement('input');
  photo.id = 'photo';
  photo.src = data.resume.side.avatar;
  fileOpen.id = 'fileOpen';
  fileOpen.type = 'file';
  fileOpen.accept = 'image/*';
  avatar.appendChild(photo);
  avatar.appendChild(fileOpen);
  fileOpen.onchange = function () {
    var file = fileOpen.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        photo.src = reader.result;
      }
    }
  };
}

function fillBrand(data) {
  var name = document.querySelector('#name');
  name.innerHTML = data.resume.side.brand.name;
  var position = document.querySelector('#position');
  position.innerHTML = data.resume.side.brand.position;
}

function fillPersonal(data) {
  var address = document.querySelector('#address');
  address.innerHTML = data.resume.side.personal.address;
  var phone = document.querySelector('#phone');
  phone.innerHTML = data.resume.side.personal.phone;
  var email = document.querySelector('#email');
  email.innerHTML = data.resume.side.personal.email;
  var www = document.querySelector('#www');
  www.innerHTML = data.resume.side.personal.www;
  var github = document.querySelector('#github');
  github.innerHTML = data.resume.side.personal.github;
}

function fillSkill(data) {
  var frontend = document.querySelector('#frontend');
  frontend.innerHTML = data.resume.side.skill.frontend;
  var backend = document.querySelector('#backend');
  backend.innerHTML = data.resume.side.skill.backend;
  var database = document.querySelector('#database');
  database.innerHTML = data.resume.side.skill.database;
  var tool = document.querySelector('#tool');
  tool.innerHTML = data.resume.side.skill.tool;
}

function fillLanguage(data) {
  var language = document.querySelector('#language');
  var ruler = language.querySelector('.ruler');
  var desc = language.querySelector('.desc');
  var languages = data.resume.side.language;
  languages.forEach(function (lang) {
    var block = document.createElement('div');
    block.style.width = lang.data + '%';
    ruler.appendChild(block);
    var name = document.createElement('div');
    name.innerHTML = lang.name;
    desc.appendChild(name);
  });
}

function fillIntro(data) {
  var intro = document.querySelector('#intro');
  intro.innerHTML = data.resume.main.intro;
}

function fillEducation(data) {
  var html = document.querySelector('html');
  var education = document.querySelector('#education');
  var edus = data.resume.main.education;
  edus.forEach(function (edu) {
    var table = document.createElement('table');
    var tr0 = document.createElement('tr');
    var tr1 = document.createElement('tr');

    var school = document.createElement('td');
    var time = document.createElement('td');
    school.className = 'school';
    school.innerHTML = edu.school;
    time.innerHTML = edu.start.concat("&nbsp;-&nbsp;", edu.end);
    tr0.appendChild(school);
    tr0.appendChild(time);

    var field = document.createElement('td');
    var grade = document.createElement('td');
    field.innerHTML = edu.field;
    grade.innerHTML = (html.lang === 'zh' ? '成绩' : 'Grade') + ':&nbsp;' + edu.grade;
    tr1.appendChild(field);
    tr1.appendChild(grade);

    table.appendChild(tr0);
    table.appendChild(tr1);

    var tr2 = document.createElement('tr');
    var extend = document.createElement('td');
    var ruler = document.createElement('div');
    var desc = document.createElement('div');
    ruler.className = 'ruler';
    desc.className = 'desc';
    extend.appendChild(ruler);
    extend.appendChild(desc);
    var gridWidth = 100 / edu.semester;
    edu.extend.forEach(function (ex, i) {
      if (ex.data.length === 2) {
        var block = document.createElement('div');
        var sub = document.createElement('div');
        sub.className = 'sub';
        sub.setAttribute('data-num', i + 1);
        sub.style.width = ex.data[1] * gridWidth + '%';
        var sup = document.createElement('div');
        sup.className = 'sup';
        sup.style.width = ex.data[0] * gridWidth + '%';
        block.appendChild(sub);
        block.appendChild(sup);
        ruler.appendChild(block);

        var inlineBlock = document.createElement('div');
        inlineBlock.innerHTML = ex.name;
        desc.appendChild(inlineBlock);
      }
    });
    tr2.appendChild(extend);
    table.appendChild(tr2);

    var tr3 = document.createElement('tr');
    var desc = document.createElement('td');
    var ul = document.createElement('ul');
    edu.desc.forEach(function (text) {
      var li = document.createElement('li');
      li.innerHTML = text;
      ul.appendChild(li);
    });
    desc.appendChild(ul);
    tr3.appendChild(desc);
    table.appendChild(tr3);

    education.appendChild(table);
  });
}

function fillProject(data) {
  var project = document.querySelector('#project');
  var projs = data.resume.main.project;
  projs.forEach(function (proj) {
    var table = document.createElement('table');
    var tr0 = document.createElement('tr');

    var title = document.createElement('td');
    var time = document.createElement('td');
    title.className = 'title';
    title.innerHTML = proj.title;
    time.innerHTML = proj.start.concat("&nbsp;-&nbsp;", proj.end);
    tr0.appendChild(title);
    tr0.appendChild(time);

    table.appendChild(tr0);

    var tr1 = document.createElement('tr');
    var desc = document.createElement('td');
    var ul = document.createElement('ul');
    proj.desc.forEach(function (text) {
      var li = document.createElement('li');
      li.innerHTML = text;
      ul.appendChild(li);
    });
    desc.appendChild(ul);
    tr1.appendChild(desc);
    table.appendChild(tr1);

    project.appendChild(table);
  });
}

function fillExperience(data) {
  var experience = document.querySelector('#experience');
  var exps = data.resume.main.experience;
  exps.forEach(function (exp) {
    var table = document.createElement('table');
    var tr0 = document.createElement('tr');
    var tr1 = document.createElement('tr');

    var title = document.createElement('td');
    title.className = 'title';
    title.innerHTML = exp.title;
    tr0.appendChild(title);

    var employer = document.createElement('td');
    var time = document.createElement('td');
    employer.className = 'employer';
    employer.innerHTML = exp.employer;
    time.innerHTML = exp.start.concat("&nbsp;-&nbsp;", exp.end);
    tr1.appendChild(employer);
    tr1.appendChild(time);

    table.appendChild(tr0);
    table.appendChild(tr1);

    var tr2 = document.createElement('tr');
    var desc = document.createElement('td');
    var ul = document.createElement('ul');
    exp.desc.forEach(function (text) {
      var li = document.createElement('li');
      li.innerHTML = text;
      ul.appendChild(li);
    });
    desc.appendChild(ul);
    tr2.appendChild(desc);
    table.appendChild(tr2);

    experience.appendChild(table);
  });
}

function highlight(data) {
  if (Array.isArray(data.keyword) && data.keyword.length) {
    var main = document.querySelector('#main');
    data.keyword.forEach(function (word) {
      main.innerHTML = main.innerHTML.replace(word, '<strong>' + word + '</strong>');
    });
  }
}

function fixResume(paper, custom) {
  var resume = document.querySelector('#resume');
  var side = document.querySelector('#side');
  custom && (resume.style.maxWidth = custom);
  switch (paper.toLowerCase()) {
    case 'letter':
      resume.style.minHeight = 279 / 216 * resume.offsetWidth + 'px';
      break;
    case 'a4':
      resume.style.minHeight = 297 / 210 * resume.offsetWidth + 'px';
  }
  side.style.height = resume.offsetHeight + 'px';
}

function setPrint() {
  var print = document.querySelector('#print');
  print.onclick = function () {
    window.print ? window.print() : document.execCommand('print');
  }
}

function generate(data) {
  if (typeof data === 'object' && data.resume) {
    fillAvatar(data);
    fillBrand(data);
    fillPersonal(data);
    fillSkill(data);
    fillLanguage(data);
    fillIntro(data);
    fillEducation(data);
    fillExperience(data);
    fillProject(data);
    highlight(data);
    fixResume(data.size, data.custom_width);
    setPrint();
  }
}

function getJSON(options) {
  if (!options.url) return;
  var request = new XMLHttpRequest();
  request.open('get', options.url);
  request.responseType = 'json';
  request.addEventListener('readystatechange', function () {
    if (request.readyState === 4 && request.status === 200 && request.response) {
      options.success && options.success(request.response);
    }
  });
  request.send();
}

getJSON({
  url: 'data.json',
  success: generate
});