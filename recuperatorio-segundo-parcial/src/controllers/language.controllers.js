import Language from "../models/language.model.js"; 
// listar todos los lenguajes
export const getAllLanguages = async (req, res) => {
  try {
    const languages = await Language.findAll();
    res.json(languages);
  } catch (error) {
    console.error('Error al listar lenguajes:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// obtener un lenguaje por ID
export const getLanguageById = async (req, res) => {
  const { id } = req.params;
  try {
    const language = await Language.findByPk(id);
    if (!language) {
      return res.status(404).json({ error: 'Lenguaje no encontrado.' });
    }
    res.json(language);
  } catch (error) {
    console.error('Error al obtener lenguaje por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// crear un nuevo lenguaje
export const createLanguage = async (req, res) => {
  const { name, paradigm, release_year } = req.body;

  try {
    // Validar campos obligatorios: name y paradigm
    if (!name || !paradigm) {
      return res.status(400).json({ error: 'Los campos "name" y "paradigm" son obligatorios.' });
    }

    // Validar que sea un número entero
    if (release_year !== undefined && release_year !== null && !Number.isInteger(release_year)) {
        return res.status(400).json({ error: 'El campo "release_year" debe ser un número entero.' });
    }

    // Verificar que 'name' sea único
    const existingLanguage = await Language.findOne({ where: { name } });
    if (existingLanguage) {
      return res.status(409).json({ error: 'Ya existe un lenguaje con este nombre.' });
    }

    const newLanguage = await Language.create({
      name,
      paradigm,
      release_year
    });
    res.status(201).json(newLanguage);
  } catch (error) {
    console.error('Error al crear lenguaje:', error);
    // Manejo de error de unicidad desde la base de datos
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Ya existe un lenguaje con este nombre.' });
    }
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// actualizar un lenguaje existente
export const updateLanguage = async (req, res) => {
  const { id } = req.params;
  const { name, paradigm, release_year } = req.body;

  try {
    // erificar existencia del recurso
    const language = await Language.findByPk(id);
    if (!language) {
      return res.status(404).json({ error: 'Lenguaje no encontrado para actualizar.' });
    }

    // Validar campos obligatorios
    if (!name || !paradigm) {
      return res.status(400).json({ error: 'Los campos "name" y "paradigm" son obligatorios.' });
    }

    // Validar que release_year sea un número entero
    if (release_year !== undefined && release_year !== null && !Number.isInteger(release_year)) {
        return res.status(400).json({ error: 'El campo "release_year" debe ser un número entero.' });
    }

    // Verificar que 'name' sea único 
    const existingLanguageWithSameName = await Language.findOne({ where: { name } });
    if (existingLanguageWithSameName && existingLanguageWithSameName.id !== parseInt(id, 10)) {
      return res.status(409).json({ error: 'Ya existe otro lenguaje con este nombre.' });
    }

    // Actualizar el lenguaje
    language.name = name;
    language.paradigm = paradigm;
    language.release_year = release_year;
    await language.save();

    res.json(language);
  } catch (error) {
    console.error('Error al actualizar lenguaje:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Ya existe otro lenguaje con este nombre.' });
    }
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

//  eliminar un lenguaje
export const deleteLanguage = async (req, res) => {
  const { id } = req.params;
  try {
    // existencia del recurso
    const language = await Language.findByPk(id);
    if (!language) {
      return res.status(404).json({ error: 'Lenguaje no encontrado para eliminar.' });
    }

    await language.destroy();
    res.json({ message: 'Lenguaje eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar lenguaje:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};