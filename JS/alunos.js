

  // Carregar usuários
  function carregarAlunos() {
    alunos.on("value", (snapshot) => {
      const tbody = $("#tabelaAlunos");
      tbody.empty();
      snapshot.forEach((child) => {
        const user = child.val();
        const key = child.key;
        tbody.append(`
          <tr>
            <td>${user.nome}</td>
            <td>${user.email}</td>
            <td>${user.fone}</td>
            <td>
              <button class="btn btn-warning btn-sm edit-btn" data-id="${key}">Editar</button>
              <button class="btn btn-danger btn-sm delete-btn" data-id="${key}">Excluir</button>
            </td>
          </tr>
        `);
      });
    });
  }
  
  // Salvar usuário (create/upalunoste)
  $("#formAlunos").submit(function (e) {
    e.preventDefault();
  
    const id = $("#id").val();
    const nome = $("#txtnome").val();
    const email = $("#txtemail").val();
    const fone = $("#txtfone").val();
  
    if (id) {
      alunos.child(id).update({ nome, email, fone });
    } else { 
      alunos.push({ nome, email, fone });
    }
  
    this.reset();
    $("#id").val("");
  });
  
  // Editar
  $(document).on("click", ".edit-btn", function () {
    const id = $(this).data("id");
    alunos.child(id)
      .get()
      .then((snapshot) => {
        const user = snapshot.val();
        $("#id").val(id);
        $("#txtnome").val(user.nome);
        $("#txtemail").val(user.email);
        $("#txtfone").val(user.fone);
      });
  });
  
  // Excluir
  $(document).on("click", ".delete-btn", function () {
    const id = $(this).data("id");
    if (confirm("Tem certeza que deseja excluir?")) {
      alunos.child(id).remove();
    }
  });
  
  // Inicializar
  carregarAlunos();
  