class CreateTableWidget < ::Scrivito::Migration
  def up
    Scrivito::ObjClass.create(
      name: 'TableWidget',
      type: 'publication',
      is_binary: false,
      title: 'TableWidget',
      attributes: [
        {name: "style", type: "enum", values: ["table","table-striped","table-bordered","table-hover","table-condensed"]},
        {name: "table", type: "html"}
      ],
    )
  end
end
