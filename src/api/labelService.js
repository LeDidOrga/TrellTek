import trelloClient from './trelloClient';

// Create: Create a new label
export async function createLabelOnBoard(name, color, idBoard) {
    const validColors = ["yellow", "purple", "blue", "red", "green", "orange", "black", "sky", "pink", "lime"];
    if (!validColors.includes(color)) {
        throw new Error(`Invalid color: ${color}. Valid colors are: ${validColors.join(", ")}`);
    }
    try {
        const response = await trelloClient.post(
            '/boards/' + idBoard + '/labels',
            {},
            {
                params: {
                    name,
                    color,
                },
            },
        )
        return response.data
    } catch (error) {
        throw new Error(`Error creating label: ${error.message}`)
    }
}

// Read: Get labels
export async function getLabelsOnBoard(idBoard) {
    try {
        const response = await trelloClient.get('/boards/' + idBoard + '/labels')
        return response.data
    } catch (error) {
        throw new Error(`Error fetching labels: ${error.message}`)
    }
}

// Update: Update a label's details
export async function updateLabel(labelId, name, color) {
    const validColors = ["yellow", "purple", "blue", "red", "green", "orange", "black", "sky", "pink", "lime"];
    if (color && !validColors.includes(color)) {
        throw new Error(`Invalid color: ${color}. Valid colors are: ${validColors.join(", ")}`);
    }
    try {
        const response = await trelloClient.put(
            `/labels/${labelId}`,
            {},
            {
                params: {
                    name,
                    color,
                },
            },
        )
        return response.data
    } catch (error) {
        throw new Error(`Error updating label: ${error.message}`)
    }
}

// Delete: Delete a label
export async function deleteLabel(labelId) {
    try {
        const response = await trelloClient.delete(`/labels/${labelId}`)
        return response.data
    } catch (error) {
        throw new Error(`Error deleting label: ${error.message}`)
    }
}