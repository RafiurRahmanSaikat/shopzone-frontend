import {
  Edit,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Store,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Heading from "../ui/Heading";
import Modal from "../ui/Modal";
import Text from "../ui/Text";

const StoreCard = ({ store, onEdit, onDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(store.id);
      toast.success("Store deleted successfully");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Failed to delete store");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Card variant="elevated" hover className="overflow-hidden">
        <div className="relative h-40 bg-gradient-to-r from-purple-600 to-indigo-600">
          {store.banner_image ? (
            <img
              src={store.banner_image || "/placeholder.svg"}
              alt={`${store.name} banner`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Store className="h-16 w-16 text-white" />
            </div>
          )}
        </div>

        <Card.Body>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-4 h-16 w-16 overflow-hidden rounded-full border-4 border-white bg-white shadow-md dark:border-zinc-800">
                {store.logo ? (
                  <img
                    src={store.logo || "/placeholder.svg"}
                    alt={`${store.name} logo`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gray-200 dark:bg-zinc-700">
                    <Store className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <Heading as="h3" size="h5" className="mb-1">
                  {store.name}
                </Heading>
                <Text size="sm" muted>
                  {store.category}
                </Text>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<Edit className="h-4 w-4" />}
                onClick={() => onEdit(store)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                leftIcon={<Trash2 className="h-4 w-4" />}
                onClick={() => setIsDeleteModalOpen(true)}
              >
                Delete
              </Button>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-start">
              <MapPin className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
              <Text size="sm" className="flex-1">
                {store.address || "No address provided"}
              </Text>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
              <Text size="sm">{store.phone || "No phone provided"}</Text>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
              <Text size="sm">{store.email || "No email provided"}</Text>
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <Text size="sm" muted>
              {store.products_count} Products
            </Text>
            <Link
              to={`/stores/${store.id}`}
              className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
            >
              View Store <ExternalLink className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </Card.Body>
      </Card>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Store"
        footer={
          <Modal.Footer
            onCancel={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDelete}
            confirmText="Delete Store"
            confirmVariant="danger"
            isLoading={isDeleting}
          />
        }
      >
        <Text>
          Are you sure you want to delete <strong>{store.name}</strong>? This
          action cannot be undone.
        </Text>
      </Modal>
    </>
  );
};

export default StoreCard;
