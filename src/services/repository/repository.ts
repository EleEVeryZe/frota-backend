export class Repository<T extends { id: string }> {
    protected dados = new Map<string, T>();

    add(data: T): T {
        this.dados.set(data.id, data);
        return data;
    }

    getById(id: string): T | undefined {
        return this.dados.get(id);
    }

    getAll(): T[] {
        return Array.from(this.dados.values());
    }


    update(key: string, newData: T): T {
        if (!this.dados.has(key)) {
            throw new Error("Registro não encontrado para atualização.");
        }
        this.dados.set(key, newData);
        return newData;
    }

    delete(key: string): boolean {
        return this.dados.delete(key);
    }
}