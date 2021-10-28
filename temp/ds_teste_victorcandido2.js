function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();

    dataset.addColumn('Nome');
    dataset.addColumn('Cidade');

    dataset.addRow([ 'Victor', 'Itupeva' ]);
    dataset.addRow([ 'Milena', 'Jundiaí' ]);
    dataset.addRow([ 'Pedro', 'Indaiatuba' ]);
    dataset.addRow([ 'João', 'São Paulo' ]);

    return dataset;
}