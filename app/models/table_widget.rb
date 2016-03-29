class TableWidget < Widget
  attribute :table, :html

  default_for :table do |a,b|
    "<table class='table'>
      <thead>
        <tr><th>Headline</th><th>Headline</th></tr><
      /thead>
      <tbody>
        <tr><td>Content</td><td>Content</td></tr>
        <tr><td>Content</td><td>Content</td></tr>
      </tbody>
    </table>"
  end
end
