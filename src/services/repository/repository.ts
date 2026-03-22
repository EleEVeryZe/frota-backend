import { randomUUID } from 'crypto';

export class Repository<T> {
    protected dados = new Map<string, T & { id: string }>();

    add(data: T): T & { id: string } {
        const id = randomUUID();
        const entry = { ...data, id };
        
        this.dados.set(id, entry);
        return entry;
    }

    getById(id: string): (T & { id: string }) | undefined {
        return this.dados.get(id);
    }

    getAll(): (T & { id: string })[] {
        return Array.from(this.dados.values());
    }

    update(id: string, newData: T): T & { id: string } {
        if (!this.dados.has(id)) {
            throw new Error("Registro não encontrado para atualização.");
        }
        
        const updatedEntry = { ...newData, id };
        this.dados.set(id, updatedEntry);
        return updatedEntry;
    }

    delete(id: string): boolean {
        return this.dados.delete(id);
    }
}