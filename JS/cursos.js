      // Carregar usuários
  function carregarCursos() {
    cursos.on("value", (snapshot) => {
      const tbody = $("#tabelaCursos");
      tbody.empty();
      snapshot.forEach((child) => {
        const user = child.val();
        const key = child.key;
        tbody.append(`
          <tr>
            <td>${user.nome}</td>
            <td>${key}</td>
            <td>
              <button class="btn btn-warning btn-sm edit-btn" data-id="${key}">Editar</button>
              <button class="btn btn-danger btn-sm delete-btn" data-id="${key}">Excluir</button>
            </td>
          </tr>
        `);
      });
    });
  }
  
  // Salvar usuário (create/upcursoste)
  $("#formCursos").submit(function (e) {
    e.preventDefault();
  
    const id = $("#id").val();
    const nome = $("#txtnome").val();
  
    if (id) {
      cursos.child(id).update({ nome });
    } else { 
      cursos.push({ nome });
    }
  
    this.reset();
    $("#id").val("");
  });
  
  // Editar
  $(document).on("click", ".edit-btn", function () {
    const id = $(this).data("id");
    cursos.child(id)
      .get()
      .then((snapshot) => {
        const user = snapshot.val();
        $("#id").val(id);
        $("#txtnome").val(user.nome);
      });
  });
  
  // Excluir
  $(document).on("click", ".delete-btn", function () {
    const id = $(this).data("id");
    if (confirm("Tem certeza que deseja excluir?")) {
      cursos.child(id).remove();
    }
  });
  
  // Inicializar
  carregarCursos();
  